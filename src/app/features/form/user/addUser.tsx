'use client'

import { useForm } from "react-hook-form";
import { useTransition, useState  } from "react";
import { CardWrapper } from "@/app/ui/auth/cardWrapper";
import { createUser } from "@/libs/users";
import { Modal, Input, Button, ModalContent, useDisclosure } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { Select, SelectItem } from "@nextui-org/react";
import { User } from "../../../../../types";

const roles = [
    {value: 'admin', label: 'Admin'},
    {value: 'editor', label: 'Editor'},
    {value: 'writer', label: 'Writer'},
    {value: 'user', label: 'User'},
    {value: 'guest', label: 'Guest'},
]

                // todo add avatar upload



export default function AddUser() {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { onOpen, onOpenChange, isOpen } = useDisclosure();


    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
            role: '',
            username: '',
            name: '',
            lastName: '',
            avatar: '',        
        }
    })



    const onSubmit = async (value : User) => {
        const {email, password, role, username, name, lastName, avatar} = value

        startTransition(() => {
            setError('')
            setSuccess('')
            setIsLoading(true)
        })
        try {
            await createUser({email, password, role, username, name, lastName, avatar} as User)
            setSuccess('User created successfully')

        } catch (e) {
            setError('Error creating user')

        } finally {
            form.reset()
            setIsLoading(false)
            window.location.reload()
        }
    }

    return(
        <>
        <Button onPress={onOpen} color="warning" startContent={<FaPlus />}>Add User</Button>
        <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="top-center"
            backdrop="blur"
            className="text-black"
        >
            <ModalContent>

        <CardWrapper headerLabel="Add User">
            <form
                onSubmit={form.handleSubmit((value) => onSubmit(value as User))}
                className="flex flex-col space-y-4"
            >
                <>
                <span className="text-red-500 text-center">{error}</span>
                <span className="text-green-500 text-center">{success}</span>

                <Input
                    label="Email"
                    type="email"
                    value = {form.watch('email')}
                    placeholder="Enter your email"
                    isRequired
                    isDisabled={isPending}
                    {...form.register('email')}
                />
                <Input
                    label="Password"
                    type="password"
                    value = {form.watch('password')}
                    placeholder="Enter your password"
                    isRequired
                    isDisabled={isPending}
                    {...form.register('password')}
                />
                
                <Select 
                    label="Role"
                    placeholder="Select a role"
                    isRequired
                    value={form.watch('role')}
                    isDisabled={isPending}
                    {...form.register('role')}
                >
                    {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                            {role.label}
                        </SelectItem>
                    ))}
                </Select>
                <Input
                    label="Username"
                    type="text"
                    value = {form.watch('username')}
                    placeholder="Enter your username"
                    isDisabled={isPending}
                    {...form.register('username')}
                />
                <Input
                    label="Name"
                    type="text"
                    value = {form.watch('name')}
                    placeholder="Enter your name"
                    isDisabled={isPending}
                    {...form.register('name')}
                />
                <Input
                    label="Last Name"
                    type="text"
                    value = {form.watch('lastName')}
                    placeholder="Enter your last name"
                    isDisabled={isPending}
                    {...form.register('lastName')}
                />

                <Input
                    label="Avatar"
                    type="file"
                    value = {form.watch('avatar')}
                    placeholder="Enter your avatar"
                    isDisabled={isPending}
                    {...form.register('avatar')}
                />
                </>
                <Button
                    type="submit"
                    isDisabled={isPending}
                    isLoading={isLoading}
                >
                Add
                </Button>
                <Button
                    type="reset"
                    isDisabled={isPending}
                    onClick={() => form.reset()}
                >
                Cancel
                </Button>
            </form>
        </CardWrapper>
            </ModalContent>
        </Modal>
        </>

    )
}
