'use client'

import { MdDashboard } from "react-icons/md";
import { RiArticleLine } from "react-icons/ri";
import { FaUsersCog } from "react-icons/fa";
import { CiBasketball } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import MenuLink from "./menuLink/menuLink";
import UserInfo from "./userInfo/userInfo";
import type { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import {Button} from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";

import { GiMoebiusTriangle } from "react-icons/gi";




const menuItems = [
    {
        title: 'Pages',
        list: [
            {
                title: 'Dashboard',
                icon: <MdDashboard />,
                link: '/page/dashboard',
            },
            {
                title : 'Articles',
                icon : <RiArticleLine />,
                link : '/page/dashboard/articles'
            },
            {
                title : 'Users',
                icon : <FaUsersCog />,
                link : '/page/dashboard/users'
            },
            {
                title : 'Teams',
                icon : <CiBasketball />,
                link : '/page/dashboard/teams'
            },
        ],
    },
    {
        title: 'Settings',
        list: [
            {
                title: 'Settings',
                icon: <CiSettings />,
                link: '/page/dashboard/settings',
            },
            {
                title: 'Help',
                icon: <CiSettings />,
                link: '/page/dashboard/help',
            },
            {
                title: 'Logout',
                icon: <IoIosLogOut />,
                link: '/api/auth/signout',
            },
        ],
    },
];


export default function Sidebar() {
    const {data: session, status} = useSession();
    const user = session?.user as User;
    const role = session?.role as string;
    const [active, setActive ] = useState(false);


    const renderMenu = () => {
        return menuItems.map((item) => {
            const {title, list} = item;
            return (
                <div key={title}>
                    <h3 className="mt-8 text-xs font-semibold text-gray-400 uppercase dark:text-gray-500">
                        {title}
                    </h3>
                    <ul className="mt-3">
                        {list.map((subItem) => (
                            <MenuLink subItem={subItem} key={subItem.title} />
                        ))}
                    </ul>
                </div>
            )
        })
    }   


    const renderSidebar = () => {
        return (
            <nav className="flex flex-col h-screen px-4 py-8 primaryColor sticky top-0 left-0 w-18">
                {session && session?.user &&
                    <UserInfo user={user} role={role} />
                }
                {renderMenu()}
            </nav>
        )
    }

    const renderIcons = () => {
        return menuItems.map((item) => {
            const {title, list} = item;
            return (
                <ul className="flex justify-center items-center" key={title}>
                    {list.map((item, link) => (
                        <li className="relative py-3 flex flex-col justify-center items-center px-2 " key={item.title}>
                            <Tooltip placement="top" content={item.title} className="text-black">
                                <Link href={item.link} className="inline-flex items-center justify-center w-8 h-8 text-sm text-black bg-yellow-400 rounded-full hover:bg-yellow-500">
                                    {item.icon}
                                </Link>
                            </Tooltip>
                        </li> 
                    ))}
                </ul>   
                 )
        })

    }

    const renderSidebarMobile = () => {
        return (
            <nav className="flex justify-center items-center primaryColor w-full">
                {renderIcons()}
            </nav>
        )
    }

    const renderMenuIcon = () => {
        return (
            <Button onClick={() => setActive(!active)} isIconOnly color="warning" variant="faded" aria-label="Open search bar" className="bg-transparent border-none absolute z-10" disableRipple >
                <GiMoebiusTriangle className='text-yellow-400 text-xl' />
            </Button>
        )
    }



  return (
    <>
    <div className="hidden md:flex md:flex-shrink-0">
        {renderMenuIcon()}
        {active && renderSidebar()}
    </div>
    <div className="md:hidden relative">
        {renderMenuIcon()}
        {active && renderSidebarMobile()}
    </div>
    </>
    )
 
}
