import { Article } from '../../../../../../types'
import { updateArticle } from '@/libs/articles'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem, Tooltip} from "@nextui-org/react";
import { useEffect, useState, ChangeEventHandler, useMemo, useCallback, MouseEventHandler} from "react";
import Images from "next/image";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";


const tagsArray = [
    {label: '#teams', value: '#teams'},
    {label: '#club', value: '#club'},
    {label: '#players', value: 'players'},
    {label: '#article', value: '#article'},
    {label: '#video', value: '#video'},
]


type Props = {
    article: Article
}


export default function UpdateArticle({ article }: Props) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { title, description, content, cover, images, tags, _id } = article;
    const [newTitle, setNewTitle] = useState<string>('');
    const [newDescription, setNewDescription] = useState<string>('');
    const [newContent, setNewContent] = useState<string>('');
    const [newCoverPreview, setNewCoverPreview] = useState<string[]>([]);
    const [newCover, setNewCover] = useState<string[]>([]);
    const [newTags, setNewTags] = useState<string[]>([]);
    const [newPreviewImages, setNewPreviewImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<string[]>([]);


    useEffect(() => {
        return () => {
            newPreviewImages.forEach(item => URL.revokeObjectURL(item)); 
            newCoverPreview.forEach(item => URL.revokeObjectURL(item));
    }
    }
    , [ newCoverPreview, newPreviewImages ])

    const handleTitleChange : ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setNewTitle(e.target.value);
    }
    , [ setNewTitle ])

    const handleDescriptionChange : ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setNewDescription(e.target.value);
    }
    , [ setNewDescription ])

    const handleContentChange : ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setNewContent(e.target.value);
    }
    , [ setNewContent ])

    const handleCoverChange : ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        {file && setNewCoverPreview([URL.createObjectURL(file)])}
        {file && setNewCover([file.name])}
    }
    , [ setNewCover, setNewCoverPreview ])

    const handleImagesChange : ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const input = e.target as HTMLInputElement;
        const files = Array.from(input.files ?? []);
        {files && setNewPreviewImages(prevImages => [...prevImages, ...files.map(file => URL.createObjectURL(file))])}
        {files && setNewImages(prevImages => [...prevImages, ...files.map(file => file.name)])}
    }
    , [ setNewPreviewImages, setNewImages ])

    const handleImageRemove : MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        const index = Number(e.currentTarget.dataset.index);
        setNewPreviewImages(prevImages => prevImages.filter((_, i) => i !== index));
        setNewImages(prevImages => prevImages.filter((_, i) => i !== index));
    }
    , [ setNewPreviewImages, setNewImages ])

    const handleTagsChange: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
        setNewTags(e.target.value.split(',').map(tag => tag.trim()));
      }
        , [ setNewTags ])

    const resetState = () => {
        setNewTitle('');
        setNewDescription('');
        setNewCoverPreview([]);
        setNewCover([]);
        setNewPreviewImages([]);
        setNewImages([]);
        setNewTags([]);
    }

  
    const handleUpdateArticle : MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        try {
            
            const formData = new FormData();
            formData.append('id', _id);
            formData.append('title', newTitle ? newTitle : title);
            formData.append('description', newDescription ? newDescription : description);
            formData.append('content', newContent ? newContent : content);
            formData.append('cover', newCover[0])
            newImages.forEach(image => formData.append('images', image));
            newTags.forEach(tag => formData.append('tags', tag));

            await updateArticle(formData)
            resetState();
            onOpenChange();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }

      }

  return (
    <>
    <Tooltip content="Update Article" placement="top" className="text-green-500">
        <Button onPress={onOpen} isIconOnly variant="flat" className='bg-transparent'>
            <MdOutlineSystemUpdateAlt />
        </Button>
    </Tooltip>
    <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        className="text-black"
    >
        <ModalContent>
            <ModalHeader>Update Article</ModalHeader>
            <ModalBody>
                <Input
                    label="Title"
                    placeholder={title}
                    value={newTitle}
                    onChange={handleTitleChange}
                />
                <Input
                    label="Description"
                    placeholder={description}
                    value={newDescription}
                    onChange={handleDescriptionChange}
                />
                <Input
                    label="Content"
                    placeholder={content}
                    value={newContent}
                    onChange={handleContentChange}
                />
                <Input
                    label="Cover"
                    type="file"
                    onChange={handleCoverChange}
                />
                <Input
                    label="Images"
                    type="file"
                    onChange={handleImagesChange}
                />
                <Select
                    label="Tags"
                    placeholder={tags[0]}
                    value={tags}
                    onChange={handleTagsChange}
                >
                    {tagsArray.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </Select>


            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={handleUpdateArticle}>Update</Button>
                <Button onClick={onOpenChange}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    </>
  )
}