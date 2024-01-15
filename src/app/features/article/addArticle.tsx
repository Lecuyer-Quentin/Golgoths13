'use client'

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem} from "@nextui-org/react";
import { useEffect, useState, ChangeEventHandler, useMemo, useCallback, MouseEventHandler} from "react";
import Images from "next/image";
import { MdDeleteForever } from "react-icons/md";
import { createArticle } from "@/libs/articles";
import axios from "axios";
import { useRef } from "react";
import { RiArticleFill } from "react-icons/ri";
import { FaArrowAltCircleDown } from "react-icons/fa";

const tagsArray = [
    {label: '#teams', value: '#teams'},
    {label: '#club', value: '#club'},
    {label: '#players', value: '#players'},
    {label: '#article', value: '#article'},
    {label: '#video', value: '#video'},
]


export default function AddArticle() {
    const refImages = useRef<HTMLInputElement>(null);
    const refCover = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [showPreview, setShowPreview] = useState<boolean>(false);

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [coverPreview, setCoverPreview] = useState<string[]>([]);
    const [cover, setCover] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);

    const defaultImage = '/images/default.jpg';

    const canSubmit = () => {
        return (
            title !== '' &&
            description !== '' &&
            tags.length > 0 &&
            cover.length > 0 &&
            images.length > 0 &&
            content !== ''
        )

    }
    
    const handleTitleChange : ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setTitle(e.target.value);
    }, [ setTitle ])

    const handleDescriptionChange : ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setDescription(e.target.value);
    }, [ setDescription ])

    const handleContentChange : ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setContent(e.target.value);
    }, [ setContent ])

    const handleCoverChange : ChangeEventHandler<HTMLInputElement> = useCallback(() => {
        const input = refCover.current as HTMLInputElement;
        const file = input.files?.[0];
        {file && setCoverPreview([URL.createObjectURL(file)])}
        {file && setCover([`/api/uploads/${file.name}`])}
    }, [ setCover, setCoverPreview ])

    const handleImagesChange : ChangeEventHandler<HTMLInputElement> = useCallback(() => {
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
        setContent('');
        setShowPreview(false);
        setError('');
        setIsLoading(false);
    }
    const handleAddArticle : MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);

            const formDataImages = new FormData();
            const imagesFile = Array.from(refImages.current?.files ?? []);
            {imagesFile && imagesFile.forEach(file => formDataImages.append('images', file))}
            const coverFile = Array.from(refCover.current?.files ?? []);
            {coverFile && coverFile.forEach(file => formDataImages.append('cover', file))}

             await axios.post('/api/upload', formDataImages);

            const formData = new FormData();
                formData.append('title', title);
                formData.append('description', description);
                formData.append('content', content);
                {tags && tags.forEach(tag => formData.append('tags', tag));}
                {cover && cover.forEach(cover => formData.append('cover', cover));}
                {images && images.forEach(image => formData.append('images', image));}
                
            await createArticle(formData);

            resetState();
            onOpenChange();
            window.location.reload();

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleCancel = () => {
        resetState();
        onOpenChange();
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

    const renderTextButton = () => {
        if (canSubmit()) {
            return 'Add Article'
        }
        return 'All fields are required'
    }

    const renderWrapperPreview = () => {
        return (
            <div className='relative'>
                <Button color="success" variant="flat"
                    isIconOnly onClick={() => setShowPreview(!showPreview)} 
                    className="bg-transparent z-10 "
                >
                    <FaArrowAltCircleDown />
                </Button>

                {showPreview ? (
                    <div className="flex flex-wrap justify-center items-center max-h-[15rem] overflow-hidden overflow-y-auto">
                        {ImagesPreview}
                    </div>
                ) : null}

                {!showPreview && (
                    <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full
                    ">
                        {images.length > 0 && (
                            <p>Il y a  {images.length} images</p>
                        )}
                    </div>
                )}

            </div>

        )
    }



    return (
        <>
        <Button onPress={onOpen} color="warning" startContent={<RiArticleFill />}>Add Article</Button>
        <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="top-center"
            backdrop="blur"
            className="text-black"
        >
            <ModalContent>
                <>
                <ModalHeader>Add Article</ModalHeader>
                <ModalBody>
                    <Input 
                        label="Title" 
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                    <Input 
                        label="Description" 
                        type="textarea"
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                    />
                    <Input 
                        label="Content" 
                        type="textarea"
                        value={content}
                        onChange={handleContentChange}
                        required
                    />

                    <Button color="success" variant="flat">
                        <Input 
                            label="Cover" 
                            type="file"
                            ref={refCover}
                            name="cover"
                            onChange={handleCoverChange}
                            accept=".jpg, .jpeg, .png"
                            required
                            className="opacity-0 z-10 absolute top-0 left-0 w-full h-full cursor-pointer"
                        />
                            Add Cover
                    </Button>
                    {coverPreview && (
                        <div className="flex flex-wrap justify-center items-center">
                            {CoverPreview}
                        </div>
                    )}
                    
                    <Button color="success" variant="flat">
                        <Input 
                            label="Images" 
                            type="file"
                            ref={refImages}
                            name="images"
                            multiple
                            onChange={handleImagesChange}
                            accept=".jpg, .jpeg, .png"
                            required
                            className="opacity-0 z-10 absolute top-0 left-0 w-full h-full cursor-pointer"
                        />
                        Add Images
                    </Button>

                    {renderWrapperPreview()}


                    <Select
                        label="Tags"
                        placeholder="Select tags"
                        selectionMode="multiple"
                        value={tags}
                        onChange={handleTagsChange}
                        required
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
                        color={canSubmit() ? 'success' : 'danger'}
                        onClick={handleAddArticle}
                        //disabled={!canSubmit()}
                        isLoading={isLoading}
                    >
                        {renderTextButton()}
                    
                    </Button>
                    <Button color="primary" onClick={handleCancel}>Cancel</Button>
                </ModalFooter>
                </>
            </ModalContent>
        </Modal>
        </>
    )
}