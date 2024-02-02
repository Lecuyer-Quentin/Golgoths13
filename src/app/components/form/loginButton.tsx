'use client'
import { useState } from 'react'
import { Button, Modal, ModalFooter, ModalBody, useDisclosure, ModalContent } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import LoginForm from '../../features/auth/loginForm'
import {RegisterForm} from '../../features/auth/registerForm'

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: 'modal'  | 'redirect';
    asChild?: boolean;
}

export function LoginButton({
    children,
    mode = 'redirect',
    asChild
}: LoginButtonProps) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [showLogin, setShowLogin] = useState<boolean>(true)
    const [showRegister, setShowRegister] = useState<boolean>(false)

    const router = useRouter()
    const LOGIN_URL = '/api/auth/signin'

    const onCLick = () => {
        if (mode === 'modal') {
            onOpen()
        } else {
            router.push(LOGIN_URL)
        }
    }

    const toggleForm = () => {
        setShowLogin(!showLogin)
        setShowRegister(!showRegister)
    }

    return (
        <>
            <Button onPress={onCLick} size="sm" className="cursor-pointer bg-transparent text-yellow-400 font-bold hover:text-yellow-500">
                {children}
            </Button>

            {mode === 'modal' && (
                <Modal
                    isOpen={isOpen} 
                    onOpenChange={onOpenChange}
                    placement="top-center"
                    backdrop="blur"
                    className="text-black"
                >
                    <ModalContent>
                        <ModalBody>
                            {showLogin && <LoginForm />}
                            {showRegister && <RegisterForm />}
                        </ModalBody>

                        <ModalFooter className='flex justify-center'>
                            {showLogin && (
                                <span className='text-sm'>Don&apos;t have an account ?
                                    <Button className='bg-transparent'
                                     onPress={() => toggleForm()}>Sign in</Button>
                                </span>
                            )}
                            {showRegister && (
                                <span className='text-sm'>Already have an account?
                                <Button className='bg-transparent' onPress={() => toggleForm()}>Log in</Button>
                            </span>
                            )}

                        </ModalFooter>
                    </ModalContent>
                    
                </Modal>
            )}
        </>
    )
}