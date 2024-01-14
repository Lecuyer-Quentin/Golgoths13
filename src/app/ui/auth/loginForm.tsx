'use client'
import { Button, Input, Link, Spacer } from "@nextui-org/react";
import { useState } from "react";
import { CardWrapper } from "./cardWrapper";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { LoginSchema, LoginSchemaType } from "@/models/login";
import FormError from "./formError";
import FormSuccess from "./formSuccess";
import { useTransition } from "react";
import { signIn } from "next-auth/react";

export const LoginForm = () => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    const REGISTER_URL = '/page/auth/register'

    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (values : LoginSchemaType) => {
        setError('')
        setSuccess('')
        startTransition(() => {
            const {email, password} = values
            signIn('credentials', {email, password, callbackUrl: '/'})
        })
    }


    return(
        <CardWrapper
            headerLabel='Welcome Back!' 
            backButtonLabel="Don't have an account? Sign up"
            backButtonHref={REGISTER_URL}
            showSocial={true}
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
                <FormError message={error} />
                <FormSuccess  message={success} />

                <Button 
                    type="submit" 
                    className="bg-yellow-400"
                    isDisabled={isPending}
                >
                    Login
                </Button>
            </form>

      </CardWrapper>
    )
}


export default LoginForm