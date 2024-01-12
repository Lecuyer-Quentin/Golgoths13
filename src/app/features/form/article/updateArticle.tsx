import { Article } from '../../../../../types'
import { updateArticle } from '@/libs/articles'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Select, SelectItem, Tooltip} from "@nextui-org/react";
import { useEffect, useRef, useState, ChangeEventHandler, useMemo, useCallback, MouseEventHandler} from "react";
import Images from "next/image";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { FaArrowAltCircleDown } from "react-icons/fa";
// import axios from "axios";

// todo : revoir l'update de newImages et new Content
const tagsArray = [
    {label: '#teams', value: '#teams'},
    {label: '#club', value: '#club'},
    {label: '#players', value: '#players'},
    {label: '#article', value: '#article'},
    {label: '#video', value: '#video'},
]


type Props = {
    article: Article
}


export default function UpdateArticle({ article }: Props) {
    const refImages = useRef<HTMLInputElement>(null);
    const refCover = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [showNewPreview, setShowNewPreview] = useState<boolean>(false);
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

    const [updateImages, setUpdateImages] = useState<string[]>([]);

    const canSubmit = () => {
        return (
            newTitle !== '' ||
            newDescription !== '' ||
            newTags.length > 0 ||
            newCover.length > 0 ||
            newImages.length > 0 ||
            newContent !== ''
        )

    }

    useEffect(() => {
        if(newImages.length > 0) {
            setUpdateImages([...images, ...newImages])
        }
    }, [ newImages, images])


    const handleTitleChange : ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setNewTitle(e.target.value);
    }, [ setNewTitle ])

    const handleDescriptionChange : ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setNewDescription(e.target.value);
    }, [ setNewDescription ])

    const handleContentChange : ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setNewContent(e.target.value);
    }, [ setNewContent ])

    const handleCoverChange : ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const input = e.target as HTMLInputElement;
        const file = input.files?.[0];
        {file && setNewCoverPreview([URL.createObjectURL(file)])}
        {file && setNewCover([`/api/uploads/${file.name}`])}
    }, [ setNewCover, setNewCoverPreview ])

    const handleImagesChange : ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const input = e.target as HTMLInputElement;
        const files = Array.from(input.files ?? []);
        {files && setNewPreviewImages(prevImages => [...prevImages, ...files.map(file => URL.createObjectURL(file))])}
        {files && setNewImages(prevImages => [...prevImages, ...files.map(file => `/api/uploads/${file.name}`)])}
    }, [ setNewPreviewImages, setNewImages])

    const handleNewImageRemove : MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        const index = Number(e.currentTarget.dataset.index);
        setNewPreviewImages(prevImages => prevImages.filter((_, i) => i !== index));
        setNewImages(prevImages => prevImages.filter((_, i) => i !== index));
    }, [ setNewPreviewImages, setNewImages ])

    const handleTagsChange: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
        setNewTags(e.target.value.split(',').map(tag => tag.trim()));
      }, [ setNewTags ])

    const resetState = () => {
        setNewTitle('');
        setNewDescription('');
        setNewCoverPreview([]);
        setNewCover([]);
        setNewPreviewImages([]);
        setNewImages([]);
        setNewTags([]);
        setNewContent('');
        setShowPreview(false);
        setShowNewPreview(false);
        setUpdateImages([]);
    }

  
    const handleUpdateArticle : MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
           // const formDataImages = new FormData();
           //     {newImages.length > 0 && newImages.forEach(image => formDataImages.append('images', image))}
           //     {newCover.length > 0 && newCover.forEach(image => formDataImages.append('images', image))}
           //     await axios.post('/api/upload', formDataImages)

            
            const formData = new FormData();
                formData.append('id', _id);
                formData.append('title', newTitle ? newTitle : title);
                formData.append('description', newDescription ? newDescription : description);
                formData.append('content', newContent ? newContent : content);
                formData.append('cover', newCover[0] ? newCover[0] : cover[0]);
                {updateImages.length > 0 
                    ? updateImages.forEach(image => formData.append('images', image))
                    : images.forEach(image => formData.append('images', image))
                }
                formData.append('tags', newTags.length > 0 ? newTags.toString() : tags.toString());


            await updateArticle(formData)
            resetState();
            onOpenChange();
            window.location.reload();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

      }

      const CoverPreview = useMemo(() => {
        return (
            (newCoverPreview.length > 0 ? newCoverPreview : cover).map((item, index) => {
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
            )
        )}
    , [newCoverPreview, cover])

    const ImagesPreview = useMemo(() => {
        return images.map((item, index) => {
            return (
                <div key={index} className="relative border-2 border-gray-300 rounded-xl w-32 h-32 mb-2 mr-2">
                    <MdDeleteForever 
                        color="red"
                        className="absolute top-1 right-0 w-6 h-6 z-10 cursor-pointer hover:scale-125 transform transition-all duration-300 ease-in-out"
                        data-index={index}
                        onClick={handleNewImageRemove}
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
    , [images, handleNewImageRemove])

    const NewImagesPreview = useMemo(() => {
        return newPreviewImages.map((item, index) => {
            return (
                <div key={index} className="relative border-2 border-gray-300 rounded-xl w-32 h-32 mb-2 mr-2">
                    <MdDeleteForever 
                        color="red"
                        className="absolute top-1 right-0 w-6 h-6 z-10 cursor-pointer hover:scale-125 transform transition-all duration-300 ease-in-out"
                        data-index={index}
                        onClick={handleNewImageRemove}
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
    , [newPreviewImages, handleNewImageRemove])

    const handleCancel = () => {
        resetState();
        onOpenChange();
    }

    const renderTextButton = () => {
        if (canSubmit()) {
            return 'Update Article'
        }
        return 'Nothing to update'
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
                    <>
                    <p className="text-center">Old images</p>
                    <div className="flex flex-wrap justify-center items-center max-h-[15rem] overflow-hidden overflow-y-auto">
                        {ImagesPreview}
                    </div>
                    </>

                ) : null}

                {!showPreview && (
                    <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full">
                        {images.length > 0 && (
                            <p>Il y a {images.length} images</p>
                        )}
                    </div>
                )}

            </div>

        )
    }

    const renderWrapperPreviewNewImages = () => {
        return (
            <div className='relative'>
                <Button color="success" variant="flat"
                    isIconOnly onClick={() => setShowNewPreview(!showNewPreview)}
                    className="bg-transparent z-10 "
                >
                    <FaArrowAltCircleDown />
                </Button>

                {showNewPreview ? (
                    <>
                    <p className="text-center">New images</p>
                    <div className="flex flex-wrap justify-center items-center max-h-[15rem] overflow-hidden overflow-y-auto">
                        {NewImagesPreview}
                    </div>
                    </>

                ) : null}

                {!showNewPreview && (
                    <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full">
                        {newPreviewImages.length > 0 && (
                            <p>Il y a {newPreviewImages.length} images</p>
                        )}
                    </div>
                )}

            </div>

        )
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
                    {cover && (
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
                            isRequired
                            className="opacity-0 z-10 absolute top-0 left-0 w-full h-full cursor-pointer"
                        />
                        Add Images
                    </Button>

                    {renderWrapperPreview()}
                    {renderWrapperPreviewNewImages()}


                    <Select
                        label="Tags"
                        placeholder={tags.toString()}
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
                    color={canSubmit() ? 'success' : 'danger'}
                    onClick={handleUpdateArticle}
                    isLoading={isLoading}
                    disabled={!canSubmit()}
                >
                    {renderTextButton()}
                </Button>
                <Button onClick={handleCancel} color='primary'>Cancel</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    </>
  )
}