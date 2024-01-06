'use client'

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem} from "@nextui-org/react";
import { useEffect, useState, ChangeEventHandler, useMemo, useCallback, MouseEventHandler} from "react";
import Images from "next/image";
import { MdDeleteForever } from "react-icons/md";
import { Article } from "../../../../../../types";
import { createArticle } from "../../../../../libs/articles";
import axios from "axios";
import { useRef } from "react";

const tagsArray = [
    {label: '#teams', value: '#teams'},
    {label: '#club', value: '#club'},
    {label: '#players', value: 'players'},
    {label: '#article', value: '#article'},
    {label: '#video', value: '#video'},
]


export default function AddArticle() {
    const refImages = useRef<HTMLInputElement>(null);
    const refCover = useRef<HTMLInputElement>(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [coverPreview, setCoverPreview] = useState<string[]>([]);
    const [cover, setCover] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        return () => {
            previewImages.forEach(item => URL.revokeObjectURL(item)); 
            coverPreview.forEach(item => URL.revokeObjectURL(item));
    }}, [ coverPreview, previewImages ])
    
    const handleTitleChange : ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setTitle(e.target.value);
    }, [ setTitle ])

    const handleDescriptionChange : ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setDescription(e.target.value);
    }, [ setDescription ])

    const handleContentChange : ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setContent(e.target.value);
    }, [ setContent ])

    const handleCoverChange : ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const input = refCover.current as HTMLInputElement;
        const file = input.files?.[0];
        {file && setCoverPreview([URL.createObjectURL(file)])}
        {file && setCover([`/api/uploads/${file.name}`])}
    }, [ setCover, setCoverPreview ])

    const handleImagesChange : ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const input = refImages.current as HTMLInputElement;
        const files = Array.from(input.files ?? []);
        {files && setPreviewImages(prevImages => [...prevImages, ...files.map(file => URL.createObjectURL(file))])}
        {files && setImages(prevImages => [...prevImages, ...files.map(file => `/api/uploads/${file.name}`)])}
    }, [ setPreviewImages, setImages ])

    const handleImageRemove : MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        const index = Number(e.currentTarget.dataset.index);
        setPreviewImages(prevImages => prevImages.filter((_, i) => i !== index));
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    }, [ setPreviewImages, setImages ])

    const handleTagsChange: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
        setTags(e.target.value.split(',').map(tag => tag.trim()));
      }, [ setTags ])

    const resetState = () => {
        setTitle('');
        setDescription('');
        setCoverPreview([]);
        setCover([]);
        setPreviewImages([]);
        setImages([]);
        setTags([]);
    }
    const handleAddArticle : MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        try {

            const formDataImages = new FormData();
            const imagesFile = Array.from(refImages.current?.files ?? []);
            imagesFile.forEach(file => formDataImages.append(file.name, file));
            const coverFile = Array.from(refCover.current?.files ?? []);
            coverFile.forEach(file => formDataImages.append('cover', file));

            await axios.post('/api/upload', formDataImages);

           // if (title && description) {
                const formData = new FormData();
                formData.append('title', title);
                formData.append('description', description);
                formData.append('content', content);
                {tags && tags.forEach(tag => formData.append('tags', tag));}
                formData.append('cover', cover[0]);
                {images && images.forEach(image => formData.append('images', image));}
                
                await createArticle(formData)

                resetState();
                onOpenChange();
                window.location.reload();
          //  }
        } catch (error) {
            console.log(error);
        }
    }


   const CoverPreview = useMemo(() => {
        return coverPreview.map((item, index) => {
            return (
                <div key={index} className="relative border-2 border-gray-300 rounded-xl w-32 h-32 mb-2 mr-2">
                    <Images
                        src={item}
                        alt={item}
                        fill
                        className="rounded-xl"
                    />
                </div>
            )}
        )}
    , [coverPreview])

    const ImagesPreview = useMemo(() => {
        return previewImages.map((item, index) => {
            return (
                <div key={index} className="relative border-2 border-gray-300 rounded-xl w-32 h-32 mb-2 mr-2">
                    <MdDeleteForever 
                        color="red"
                        className="absolute top-1 right-0 w-6 h-6 z-10 cursor-pointer hover:scale-125 transform transition-all duration-300 ease-in-out"
                        data-index={index}
                        onClick={handleImageRemove}
                    />
                    <Images
                        src={item}
                        alt={item}
                        fill
                        className="rounded-xl"
                    />
                </div>
            )}
        )}
    , [previewImages, handleImageRemove])


    return (
        <>
        <Button onPress={onOpen} color="warning">Add Article</Button>
        <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="top-center"
            backdrop="blur"
            className="text-black"
        >
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader>Add Article</ModalHeader>
                <ModalBody>
                    <Input 
                        label="Title" 
                        //placeholder="Title" 
                        value={title}
                        onChange={handleTitleChange}
                       // required
                    />
                    <Input 
                        label="Description" 
                       // placeholder="Description" 
                        type="textarea"
                        value={description}
                        onChange={handleDescriptionChange}
                       // required
                    />
                    <Input 
                        label="Content" 
                       // placeholder="Content" 
                        type="textarea"
                        value={content}
                        onChange={handleContentChange}
                       // required
                    />
                    <Input 
                        //label="Cover" 
                        type="file"
                        ref={refCover}
                        name="cover"
                        onChange={handleCoverChange}
                      // required

                    />
                    {coverPreview && (
                        <div className="flex flex-wrap justify-center items-center">
                            {CoverPreview}
                        </div>
                    )}
                    

                    <Input 
                        //label="Images" 
                        type="file"
                        ref={refImages}
                        name="images"
                        multiple
                        onChange={handleImagesChange}
                    />
                    {previewImages && (
                        <div className="flex flex-wrap justify-center items-center">
                            {ImagesPreview}
                        </div>
                    )}

                    <Select
                        label="Tags"
                        placeholder="Select tags"
                        selectionMode="multiple"
                        value={tags}
                        onChange={handleTagsChange}
                     >
                        {tagsArray.map((tag) => (
                            <SelectItem key={tag.value} value={tag.value} variant="bordered"
                                className="text-black"
                            >
                                {tag.label}
                            </SelectItem>
                        ))}
                    </Select>


                   
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="success" 
                        onClick={handleAddArticle}
                    >
                        Add Article
                    </Button>
                    <Button onClick={onOpenChange}>Cancel</Button>

                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
        </>
    )
}