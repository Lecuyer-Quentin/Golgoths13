import { MdDashboard } from "react-icons/md";
import { RiArticleLine } from "react-icons/ri";
import { FaUsersCog } from "react-icons/fa";
import { CiBasketball } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import MenuLink from "./menuLink/menuLink";
import UserInfo from "./userInfo/userInfo";

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
                link: '/logout',
            },
        ],
    },
];


export default function Sidebar() {
  return (
    <div className="flex flex-col w-48 h-screen px-4 py-8 primaryColor sticky top-0">
        <UserInfo />

        <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
            {menuItems.map((item) => (
                <div key={item.title}>
                    <h3 className="mt-8 text-xs font-semibold text-gray-400 uppercase dark:text-gray-500">
                        {item.title}
                    </h3>
                    <ul className="mt-3">
                        {item.list.map((subItem) => (
                            <MenuLink subItem={subItem} key={subItem.title} />
                        ))}
                    </ul>
                </div>
            ))}
            </nav>
        </div>
    </div>

  )
}
