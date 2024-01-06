'use client'

import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/react";
import { Link, Button } from "@nextui-org/react";
import { useState } from "react";
import Image from "next/image";
import SignIn from "../../auth/signIn/signIn";
import AvatarProfile from "../../components/user/avatarProfile";
import Logo from "../../../../../public/logos/g13_logo.png";

type MenuItem = {
    title: string;
    href: string;
    subtitle: {title: string, href: string}[];
}

const menuItems = [
    { title: "Actualités", href: "/news", subtitle:[{title:"subtitle", href:"#"},{title:"subtitle", href:"#"}] },
    { title: "Équipes", href: "/teams",subtitle:[{title:"subtitle2", href:"#"},{title:"subtitle", href:"#"}] },
    { title: "Matchs", href: "/matchs", subtitle:[{title:"subtitle3", href:"#"},{title:"subtitle", href:"#"}] },
    { title: "Club", href: "/club", subtitle:[{title:"subtitle4", href:"#"},{title:"subtitle", href:"#"}] },
];

export default function Header() {
    const logo = Logo;
    const [active, setActive] = useState(false);
    const toggleActive = () => setActive(!active);
    const [auth, setAuth] = useState(false);
    const toggleAuth = () => setAuth(!auth);
   
    
    const renderMenu = () => {
        return (
            <>
                {menuItems.map((item : MenuItem, i: number) => (
                    <Link href={item.href} key={i}>
                        <NavbarItem className="relative">
                            <Button disableRipple className="bg-transparent text-white hover:text-yellow-400 transition duration-500 ease-in-out">
                                {(item.title).toUpperCase()}
                            </Button>
                        </NavbarItem>
                    </Link>  
                ))}
            </>
        )  
    }

  return (
    <header>
        <Navbar
            className="primaryColor text-yellow-400"
            aria-label="Site navigation"
            shouldHideOnScroll={true} onMenuOpenChange={toggleActive}>

            <NavbarContent className="flex justify-start">
                <NavbarMenuToggle
                    aria-label={active ? "Close menu" : "Open menu"}
                    className="sm:hidden z-50"
                />
                <NavbarBrand className="hidden md:flex md:justify-center md:items-center">
                    <Link href="/" aria-label="Logo">
                        <Image src={logo} alt="logo" width={200} height={200} priority className="h-auto w-auto" />
                    </Link>
                </NavbarBrand>
            </NavbarContent>


            <NavbarContent className="hidden sm:flex lg:justify-center lg:items-center">
                {renderMenu()}
            </NavbarContent>

            <NavbarContent justify="end" className="">
                <Button className="bg-transparent text-white hover:text-yellow-400 transition duration-500 ease-in-out" onClick={toggleAuth}>
                    {auth ? "Auth false" : "Auth true"}
                </Button>
                {auth ? <AvatarProfile /> : <SignIn />}
            </NavbarContent>

            <NavbarMenu className="bg-transparent">
                {renderMenu()}
            </NavbarMenu>

        </Navbar>
    </header>
  )
}


