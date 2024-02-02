
import Image from 'next/image'
import { Avatar } from '@nextui-org/react'
import type { User } from "next-auth";

type UserProfile = {
  user : User;
  role : string;
}

export default function UserInfo({user, role} : UserProfile) {

    const { image, name } = user;

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
    
    const renderUserName = name ? (
        <>{name}</>
      ) : (
        <>Email not found</>
      )

    const renderUserRole = role ? (
        <>{role}</>
      ) : (
        <>Role not found</>
      )



  return (
      <div className="flex items-center px-4 -mx-2 text-white">
        <div className="flex-shrink-0">
            {renderUserImage}
        </div>
        <div className="mx-2">
            <p className="mx-2 font-medium ">
                {renderUserName}
            </p>
            <p className="mx-2 text-sm font-medium">
                {renderUserRole}
            </p>
        </div>
        </div>
  )
}
