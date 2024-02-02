'use client'

import { Button,  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/react";
import { useState } from "react";
import Image from "next/image";
import AvatarProfile from "../../../components/user/avatarProfile";
import Logo from "../../../../../public/logos/g13_logo.png";
import { LoginButton } from "../../../components/form/loginButton";
import { forEach } from "@/app/utils/forEach";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { ThemeSwitcher } from "@/app/components/theme/switcher";
import { useRouter } from "next/navigation"

type MenuItem = {
    title: string;
    href: string;
}

const menuItems = [
    { title: "Home", href: "/" },
    { title: "Actualités", href: "/news" },
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
    const id = session?.id as string;

    const router = useRouter();

    const renderMenu = () => {
        return forEach({of: menuItems, render: (item : MenuItem) => {
            const {title, href} = item;
            return (
                <NavbarMenuItem key={title} className="flex-none">
                    <Button 
                            onPress={() => {router.push(href)}}
                            disableRipple className={`flex-none bg-transparent text-yellow-400 font-bold hover:text-yellow-500 `}>
                        {(title).toUpperCase()}
                    </Button>
                </NavbarMenuItem>
            )
        }})
    }


    const renderAuth = () => {
        return (

                status === 'authenticated' && (
                    <AvatarProfile user={user} role={role} id={id} />
                )
                ||
                status === 'unauthenticated' && (
                    <div className=" absolute right-0 top-[.9rem]">
                        <LoginButton mode="modal">Log in</LoginButton>
                    </div>
                )
                ||
                status === 'loading' && (
                    <div className="flex justify-center items-center">
                        <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                    </div>
                )

        )
    }



  return (
    <header className=" px-2 py-2 bg-black sticky top-0 z-50">

        <Navbar 
            className="primaryColor text-yellow-400 h-12 min-w-full"
            aria-label="Site navigation"
            onMenuOpenChange={toggleActive}>

                {/* Logo and Theme Switcher */}
            <NavbarContent justify="start" className="flex-none">
                <ThemeSwitcher />
                <NavbarBrand  className="hidden md:flex">
                    <Button
                        aria-label="Logo"
                        className="flex-none bg-transparent"
                        disableRipple
                        onPress={() => {router.push("/")}}
                    >
                        <Image src={logo} alt="logo" width={150} height={150} priority/>
                    </Button>
                </NavbarBrand>
            </NavbarContent>

                {/* Menu on mobile */}
            <NavbarContent justify="start" className="flex justify-start">
                <NavbarMenuToggle
                    aria-label={active ? "Close menu" : "Open menu"}
                    className="sm:hidden z-50 absolute left-10"
                />
            </NavbarContent>

                {/* Menu open on mobile */}
            <NavbarMenu aria-label="Menu"
                className="flex-none primaryColor flex flex-col justify-around items-center z-50"
            >
                {renderMenu()}
            </NavbarMenu>


                {/* Menu on desktop */}
            <NavbarContent justify="center" className="hidden sm:flex">
                {renderMenu()}
            </NavbarContent>

                {/* Auth */}
            <NavbarContent justify="end" className="flex-none">
                <NavbarItem className="flex-none">
                    {renderAuth()}
                </NavbarItem>
            </NavbarContent>
                    


        </Navbar>
    </header>
  )
}


