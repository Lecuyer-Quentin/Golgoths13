import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, DropdownSection, Button} from "@nextui-org/react";
import Link from "next/link";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type UserProfile = {
  user: User;
  role: string;
  id: string;
}

type MenuItem = {
  title: string;
  href: string;
  key: string;
}


export default function AvatarProfile({user, role, id} : UserProfile) {

  const router = useRouter();

  if (!user) return null;
  const { image, email, name} = user;


  const menuItemsUser = [
    { title: "My Profile", href: `/users/${id}`, key: "profile" },
    { title: "My Account", href: "/", key: "account" },
    //{ title: "My Settings", href: "/", key: "settings" },
    //{ title: "Help & Feedback", href: "/", key: "help_and_feedback" },
  ]

  const menuItemsAdmin = [
    { title: "Dashboard", href: "/dashboard", key: "dashboard" },
    { title: "My Profile", href: `/users/${id}`, key: "profile" },
    { title: "My Account", href: "/", key: "account" },
    //{ title: "My Settings", href: "/", key: "settings" },
    //{ title: "Help & Feedback", href: "/", key: "help_and_feedback" },
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

    const renderUserId = id ? (
      <>{id}</>
    ) : (
      <>ID not found</>
    )

    

    const renderAdmin = () => {
      return(
        menuItemsAdmin.map((item: MenuItem) => {
          return (
            <DropdownItem key={item.key} className="h-14 gap-2" disableAnimation>
              <Button onPress={() => router.push(item.href)} color="warning" variant="faded" aria-label={`${item.key} button`} className="bg-transparent border-none" disableRipple >
                {item.title}
              </Button>
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
            <Button onPress={() => router.push(item.href)} color="warning" variant="faded" aria-label={`${item.key} button`} className="bg-transparent border-none" disableRipple >
              {item.title}
            </Button>
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

        <DropdownMenu aria-label="Profile Actions" variant="light">

          <DropdownItem key="profile" className="h-14 gap-4 ml-3">
            <p className="font-semibold">Welcome {renderUserName}</p>
            {renderUserRoles}
          </DropdownItem>

          <DropdownSection>
            {role === "admin" ? renderAdmin() : renderUser()}
          </DropdownSection>

          
          <DropdownItem key="signOut">
            <Button onPress={() => signOut()} color="danger" variant="faded" aria-label="Sign out button" className="bg-transparent border-none" disableRipple >
              Sign Out
            </Button>
          
          </DropdownItem>

        </DropdownMenu>
      </Dropdown>
    </div>
  );
}