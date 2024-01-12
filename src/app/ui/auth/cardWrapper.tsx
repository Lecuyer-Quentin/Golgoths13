'use client'

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import Header from "./header";
import Social from "./social";
import BackButton from "./backButton";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = ({
    children, headerLabel, backButtonLabel, backButtonHref, showSocial
}: CardWrapperProps) => {

    return(
        <Card className="w-[400px] mx-auto my-4 bg-white text-black">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardBody>
                {children}
            </CardBody>
            {showSocial && (
                <CardFooter>    
                    <Social />
                </CardFooter>
            )}   
            <CardFooter className="flex justify-center">
                <BackButton label={backButtonLabel} href={backButtonHref}/>
            </CardFooter>             
        </Card>
    )
}


