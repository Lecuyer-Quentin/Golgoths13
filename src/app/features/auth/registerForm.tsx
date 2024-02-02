'use client'

import { FormWrapper } from "../../components/form/formWrapper";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { LoginSchema} from "@../../../src/models/login";
import FormError from "../../components/form/formError";
import FormSuccess from "../../components/form/formSuccess";
import { useCallback, useEffect, useTransition } from "react";
import { Button, Input, Link, Spacer } from "@nextui-org/react";
import { useState } from "react";
import { createUser } from "@/libs/users";
import { User } from "../../../../types";


export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false)
    const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false)
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')

    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })
    const password = form.watch('password')

    const checkPasswordMatch = useCallback(({value} : {value : string}) => {
        if (value === password) {
            setIsPasswordMatch(true)
        } else {
            setIsPasswordMatch(false)
        }
    }, [password])
    

    useEffect(() => {
        checkPasswordMatch({value: passwordConfirm})
    }, [password, passwordConfirm, checkPasswordMatch])

    const resetForm = () => {
        form.reset()
        setIsPasswordMatch(false)
        setPasswordConfirm('')
    }
 
    const onSubmit = async (values : User ) => {
        const {email, password} = values
        startTransition(() => {
            setError('')
            setSuccess('')
            setIsLoading(true)
        })
        try {
            await createUser({email, password} as User)
            .then((res) => {
                setSuccess('User created successfully')
                resetForm()
            })
            .catch((err) => {
                setError('Something went wrong')
            })
            .finally(() => {
                setIsLoading(false)
                window.location.reload()
    
            })
        } catch (err) {
            setError('Something went wrong')
        }
    }


    const handlePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    const handleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
    }

    const renderPasswordVisibility = () => {
        return (
            <Button
                variant="light"
                color="primary"
                onPress={handlePasswordVisibility}
            >
                {isPasswordVisible ? 'Hide' : 'Show'}
            </Button>
        )
    }

    const renderConfirmPasswordVisibility = () => {
        return (
            <Button
                variant="light"
                color="primary"
                onPress={handleConfirmPasswordVisibility}
            >
                {isConfirmPasswordVisible ? 'Hide' : 'Show'}
            </Button>
        )
    }
    const renderPasswordConfirmation = () => {
        return (
            <div className="flex flex-col space-y-2 justify-center items-center">
                {!isPasswordMatch 
                    ? <p className="text-red-500 text-sm">Passwords do not match</p> 
                    : <p className="text-green-500 text-sm">Passwords match</p>
                }

            </div>
        )
    }

    const isButtonDisabled = () => {
        return !isPasswordMatch || isLoading || isPending || form.watch('email') === ''
                || form.watch('password') === '' || passwordConfirm === ''
    }

  

    return (
        <>
        <FormWrapper
            headerLabel='Welcome to our community!'
           // backButtonLabel="Already have an account ?"
           // showSocial={true}
           // showLogin={true}

        >
            <form
                onSubmit={form.handleSubmit((value) => onSubmit(value as User))}
                className="flex flex-col space-y-4"
            >
                <Input
                    label="Email"
                    type="email"
                    value = {form.watch('email')}
                    placeholder="Enter your email"
                    isRequired
                    isDisabled={isPending}
                    errorMessage={form.formState.errors.email?.message}
                    {...form.register('email')}
                />
                <Input
                    label="Password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="***********"
                    value={form.watch('password')}
                    isRequired
                    isDisabled={isPending}
                    errorMessage={form.formState.errors.password?.message}
                    {...form.register('password')}
                    endContent={renderPasswordVisibility()}
                />
                <Input 
                    label="Confirm Password"
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    placeholder="***********"
                    value={passwordConfirm}
                    isRequired
                    isDisabled={isPending}
                    errorMessage={form.formState.errors.password?.message}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    endContent={renderConfirmPasswordVisibility()}
                />
               
                <Spacer y={1} />
                {renderPasswordConfirmation()}
                <Spacer y={1} />

                {error && <FormError message={error} />}
                {success && <FormSuccess message={success} />}

                <Button
                    type="submit"
                    color="primary"
                    className="w-full"
                    isLoading={isLoading}
                    isDisabled={isButtonDisabled()}
                >
                    Sign Up
                </Button>
            </form>
        </FormWrapper>

        
        </>
        
    )
}
