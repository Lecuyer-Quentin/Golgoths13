import { deleteUser } from "@/libs/users";
import { Button } from "@nextui-org/react";
import { useTransition, useState  } from "react";
import { MdDeleteForever } from "react-icons/md";


type Props = {
    id: string
}

export default function DeleteUser({ id }: Props) {
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
            console.log('id', id)
            await deleteUser(id)
            setSuccess('User deleted successfully')

        } catch (e) {
            setError('Error deleting user')

        } finally {
            setIsLoading(false)
            window.location.reload()
        }
    }

    return (
        <>
           <Button onClick={handleDelete}
                   startContent={<MdDeleteForever />} 
                   className='w-full bg-transparent text-red-600'

           >
               Delete User  
           </Button>
           {error && <p className='text-red-600'>{error}</p>}
            {success && <p className='text-green-600'>{success}</p>}

       </>
    )
}