import { deleteArticle } from '@/libs/articles'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { MdDeleteSweep } from "react-icons/md";
import { Tooltip } from '@nextui-org/react';


type Props = {
    id: string
}

export default function DeleteArticle({ id }: Props) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const handleDelete = async () => {
        await deleteArticle(id);
        window.location.reload();
    }

  return (
    <>
    <Tooltip content="Delete Article" placement="top" className="text-red-500">
        <Button onPress={onOpen} isIconOnly variant="flat" className='bg-transparent text-red-500'>
            <MdDeleteSweep />
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
            <ModalHeader>Delete Article</ModalHeader>
            <ModalBody>
                <p>Are you sure you want to delete this article?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={handleDelete}>Delete</Button>
                <Button onClick={onOpenChange}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    </>
  )
}

