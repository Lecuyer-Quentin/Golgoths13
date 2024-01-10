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

  return (
    <div className="flex flex-col w-48 h-screen px-4 py-8 primaryColor sticky top-0">
        {session && session?.user && 
            <UserInfo user={user} role={role} />
        }
        <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
            {renderMenu()}
            </nav>
        </div>
    </div>

  )
}
