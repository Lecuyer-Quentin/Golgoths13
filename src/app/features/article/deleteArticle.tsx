import { deleteArticle } from '@/libs/articles'
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { MdDeleteSweep } from "react-icons/md";
import { Tooltip } from '@nextui-org/react';
import { FormWrapper } from "@/app/components/form/formWrapper";
import { useTransition, useState  } from "react";


type Props = {
    id: string
}

export default function DeleteArticle({ id }: Props) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)


   const handleDelete = async () => {
        startTransition(() => {
            setError('')
            setSuccess('')
            setIsLoading(true)
        })
        try {
            await deleteArticle(id)
            setSuccess('Article deleted successfully')

        } catch (e) {
            setError('Error deleting article')

        } finally {
            setIsLoading(false)
            onOpenChange()
            window.location.reload()
        }
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
            <FormWrapper headerLabel="Delete Article">
                <ModalBody>
                    <p>Are you sure you want to delete this article?</p>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        onClick={handleDelete} 
                        isLoading={isLoading}
                        content='Delete'
                        isDisabled={isPending}
                        color='danger'
                    >Delete</Button>
                    <Button 
                        onClick={onOpenChange}
                        content='Cancel'
                        isDisabled={isPending}
                        color='primary'
                    >Cancel</Button>
                </ModalFooter>
            </FormWrapper>
            
        </ModalContent>
    </Modal>
    </>
  )
}

