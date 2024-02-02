'use client'
import { Button, Input, Link, Spacer } from "@nextui-org/react";
import { useState } from "react";
import { FormWrapper } from "@/app/components/form/formWrapper";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { LoginSchema, LoginSchemaType } from "@/models/login";
import FormError from "@/app/components/form/formError";
import FormSuccess from "@/app/components/form/formSuccess";
import { useTransition } from "react";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const REGISTER_URL = '/page/auth/register'

    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (values : LoginSchemaType) => {
        startTransition(() => {
            setError('')
            setSuccess('')
            setIsLoading(true)
        })
        signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false
        })
        .then((res : any) => {
            if (res.error) {
                setError('Email or password is incorrect')
            }
        })
        .catch((err) => {
            setError(err)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }


    return(
        <FormWrapper
            headerLabel='Welcome Back!' 
            backButtonLabel="Don't have an account ?"
            showSocial={true}
            showRegister={true}
        >
            <form
                onSubmit={form.handleSubmit(onSubmit)}
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
                    type="password"
                    placeholder="***********"
                    value={form.watch('password')}
                    isRequired
                    isDisabled={isPending}
                    errorMessage={form.formState.errors.password?.message}
                    {...form.register('password')}
                />
                {error && <FormError message={error} />}
                {success && <FormSuccess message={success} />}
                
                <Button 
                    type="submit" 
                    className="bg-yellow-400"
                    isDisabled={isPending}
                    isLoading={isLoading}
                >
                    Login
                </Button>
            </form>
      </FormWrapper>
    )
}


export default LoginForm