'use client'

import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/react";
import { Link, Button } from "@nextui-org/react";
import { useState } from "react";
import Image from "next/image";
import AvatarProfile from "../../../components/user/avatarProfile";
import Logo from "../../../../../public/logos/g13_logo.png";
import { LoginButton } from "../../../components/form/loginButton";
import { forEach } from "@/app/utils/forEach";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { RegisterButton } from "@/app/components/form/registerButton";


type MenuItem = {
    title: string;
    href: string;
}

const menuItems = [
    { title: "Actualités", href: "/page/news" },
    { title: "Équipes", href: "/teams" },
    { title: "Matchs", href: "/matchs"},
    { title: "Club", href: "/club"},
];

export default function Header( ) {
    const logo = Logo;
    const [active, setActive] = useState(false);
    const toggleActive = () => setActive(!active);
    const {data: session, status} = useSession();
    const user = session?.user as User 
    const role = session?.role as string;

    const renderMenu = () => {
        return forEach({of: menuItems, render: (item : MenuItem) => {
            const {title, href} = item;
            return (
                <NavbarMenuItem key={title} className="relative">
                    <Button onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}
                    disableRipple className="bg-transparent text-white hover:text-yellow-400 transition duration-500 ease-in-out">
                        <Link 
                            href={href}
                            className="bg-transparent text-white hover:text-yellow-400 transition duration-500 ease-in-out"
                        >
                            {(title).toUpperCase()}
                        </Link>
                    </Button>
                </NavbarMenuItem>
            )
        }})
    }

    const renderAuthBtn = () => {
        return (
            <>
                <LoginButton mode="modal">Login</LoginButton>
                <RegisterButton mode="modal">Register</RegisterButton>
            </>
        )
    }


    const renderAuth = () => {
        return (
                session
                    ? <AvatarProfile user={user} role={role} />
                    : renderAuthBtn()
                
        )
    }
  return (
    <header className="w-full px-2 py-2 bg-black">
        <Navbar
            className="primaryColor text-yellow-400 h-12"
            aria-label="Site navigation"
            shouldHideOnScroll={true} onMenuOpenChange={toggleActive}>

            <NavbarContent className="flex justify-start">
                <NavbarMenuToggle
                    aria-label={active ? "Close menu" : "Open menu"}
                    className="sm:hidden z-50"
                />
                <NavbarBrand className="hidden md:flex md:justify-start md:items-center flex-none">
                    <Link href="/" aria-label="Logo">
                        <Image src={logo} alt="logo" width={150} height={150} priority className="" />
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex lg:justify-center lg:items-center">
                {renderMenu()}
            </NavbarContent>


            <NavbarContent justify="end" className="flex-none">  
                <NavbarItem className="flex-none">
                    {renderAuth()}
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu className="bg-transparent">
                {renderMenu()}
            </NavbarMenu>

        </Navbar>
    </header>
  )
}


