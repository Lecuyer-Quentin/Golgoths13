import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User, DropdownSection} from "@nextui-org/react";

type UserProfile = {
  name: string;
  email: string;
  avatar: string;
    roles: string[];
};

type MenuItem = {
  title: string;
  href: string;
  key: string;
}


export default function AvatarProfile() {

  const user : UserProfile = {
    name: "Zoey",
    email: "test@test.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    roles: ["admin"],
  };
  
  const menuItems = [
    { title: "My Profile", href: "/", key: "profile" },
    { title: "My Settings", href: "/", key: "settings" },
    { title: "Help & Feedback", href: "/", key: "help_and_feedback" },
    {roles : ["admin"], title: "Admin", href: "/dashboard", key: "admin" },
  ]


  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end" className="bg-black text-yellow-400 mt-2">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            color="warning"
            className="transition-transform hover:scale-110"
            src={user.avatar}
          />
        </DropdownTrigger>

        <DropdownMenu aria-label="Profile Actions" variant="light" >
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user.email}</p>
          </DropdownItem>

          <DropdownSection>
            {menuItems.map((item: MenuItem, i: number) => (
              <DropdownItem
                key={i}
                href={item.href}
                className="h-14 gap-2"
                color="secondary"
                variant="light"
              >
                {item.title}
              </DropdownItem>
            ))}
          </DropdownSection>
          
          <DropdownItem 
            href="/api/auth/logout" aria-label="submenu item"
            key="logout" className="h-14 gap-2" color="danger" variant="light">
                Log out
          </DropdownItem>

        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
