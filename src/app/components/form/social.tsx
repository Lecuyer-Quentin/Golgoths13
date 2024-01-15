import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from 'react-icons/fa';
import { Button } from "@nextui-org/react";
import Link from "next/link";

import { signIn } from "next-auth/react";


const Social = () => {
    const socialIcons = [
        {key: 'google', icon: <FcGoogle />},
        {key: 'facebook', icon: <FaFacebook />},
        {key: 'github', icon: <FaGithub />}
    ]

    return(
        <div className="w-full flex justify-center items-center space-x-4">
            {socialIcons.map(({key, icon}) => (
                <Button key={key} onClick={() => signIn(key)} isIconOnly variant="faded" aria-label={`Connect with ${key}`} className="bg-transparent border-none" size="lg" >
                    {icon}
                </Button>
            ))}
        </div>
    )
}

export default Social