import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, DropdownSection} from "@nextui-org/react";
import Link from "next/link";
import type { User } from "next-auth";

type UserProfile = {
  user : User;
  role : string;
}

type MenuItem = {
  title: string;
  href: string;
  key: string;
}


export default function AvatarProfile({user, role} : UserProfile) {

  const { image, email, name } = user;
  
  const menuItemsUser = [
    { title: "My Profile", href: "/page/profile", key: "profile" },
    { title: "My Account", href: "/", key: "account" },
    { title: "My Settings", href: "/", key: "settings" },
    { title: "Help & Feedback", href: "/", key: "help_and_feedback" },
  ]

  const menuItemsAdmin = [
    { title: "Dashboard", href: "/page/dashboard", key: "dashboard" },
    { title: "My Profile", href: "/page/profile", key: "profile" },
    { title: "My Account", href: "/", key: "account" },
    { title: "My Settings", href: "/", key: "settings" },
    { title: "Help & Feedback", href: "/", key: "help_and_feedback" },
  ]

  const renderUserImage = image ? (
    <Avatar
      isBordered
      as="button"
      color="warning"
      className="transition-transform hover:scale-110"
      src={image}
    />
  ) : (
    <Avatar
      isBordered
      as="button"
      color="warning"
      className="transition-transform hover:scale-110"
    >
      {name?.charAt(0)}
    </Avatar>
  )

    const renderUserEmail = email ? (
      <p className="font-semibold">{email}</p>
    ) : (
      <p className="font-semibold">Email not found</p>
    )

    const renderUserRoles = role ? (
      <p className="font-semibold">Role: {role}</p>
    ) : (
      <p className="font-semibold">Role not found</p>
    )

    const renderUserName = name ? (
      <>{name}</>
    ) : (
      <>Name not found</>
    )
    

    const renderAdmin = () => {
      return(
        menuItemsAdmin.map((item: MenuItem) => {
          return (
            <DropdownItem key={item.key} className="h-14 gap-2" disableAnimation>
              <Link href={item.href}>{item.title}</Link>
            </DropdownItem>
          )
        })
      )
    }


    const renderUser = () => {
      return (
      menuItemsUser.map((item: MenuItem) => {
        return (
          <DropdownItem key={item.key} className="h-14 gap-2">
            <Link href={item.href}>{item.title}</Link>
          </DropdownItem>
        )
      })
    )
    }


  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end" className="bg-black text-yellow-400 mt-2">
        <DropdownTrigger>
          {renderUserImage}
        </DropdownTrigger>

        <DropdownMenu aria-label="Profile Actions" variant="light" >
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Welcome {renderUserName}</p>
            {renderUserEmail}
            {renderUserRoles}
          </DropdownItem>

          <DropdownSection>
            {role === "admin" ? renderAdmin() : renderUser()}
          </DropdownSection>

          
          <DropdownItem 
            href="/api/auth/signout" aria-label="submenu item"
            key="logout" className="h-14 gap-2" color="danger" variant="light">
                Log out
          </DropdownItem>

        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
