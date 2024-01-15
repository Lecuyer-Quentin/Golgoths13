'use client'
import React, { useState } from 'react'
import { Button, Modal } from '@nextui-org/react'
import { SessionProvider, useSession } from 'next-auth/react'
import { ModalBody, ModalHeader } from '@nextui-org/react'
import { useDisclosure } from '@nextui-org/react'
import { ModalContent } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import {RegisterForm} from '@/app/features/auth/registerForm'

interface RegisterButtonProps {
    children: React.ReactNode;
    mode?: 'modal'  | 'redirect';
    asChild?: boolean;
}

export function RegisterButton({
    children,
    mode = 'redirect',
    asChild
}: RegisterButtonProps) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const router = useRouter()
    const { data: session } = useSession()

    const LOGIN_URL = '/api/auth/signin'
        

    //if (status === 'loading') return null

    // if (session) {
        // return asChild ? children : null
    // }

    const onCLick = () => {
        if (mode === 'modal') {
            onOpen()
        } else {
            router.push(LOGIN_URL)
        }
    }
    return (
        <>
            <Button onPress={onCLick} size="sm" color="primary" className="cursor-pointer">
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
                            <RegisterForm />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </>
    )
}