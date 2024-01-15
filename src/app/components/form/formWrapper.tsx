'use client'

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import Header from "./header";
import Social from "./social";
import BackButton from "./backButton";
import React from "react";
import { LoginButton } from "./loginButton";
import { RegisterButton } from "./registerButton";

interface FormWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel?: string;
    showSocial?: boolean;
    showLogin?: boolean;
    showRegister?: boolean;
}

export const FormWrapper = ({
    children, headerLabel, backButtonLabel, showSocial, showLogin, showRegister
}: FormWrapperProps) => {

    return(
        <Card className="w-[400px] mx-auto my-4 bg-white text-black">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardBody>
                {children}
            </CardBody>
            {showSocial && (
                <CardFooter className="flex flex-col justify-center">
                    or connect with 
                    <Social />
                </CardFooter>
            )}
            {backButtonLabel && (
            <CardFooter className="flex justify-center">
                <span className="text-sm">{backButtonLabel}</span>
                    {showLogin && <LoginButton mode="modal">Login</LoginButton>}
                    {showRegister && <RegisterButton mode="modal">Register</RegisterButton>}
            </CardFooter>    
            )}         
        </Card>
    )
}


