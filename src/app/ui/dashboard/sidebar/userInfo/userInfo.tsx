import React from 'react'
import Image from 'next/image'

export default function UserInfo() {
  return (
      <div className="flex items-center px-4 -mx-2">
            <Image width={50} height={50} className="object-cover mx-2 rounded-full h-9 w-9"
                src=""
                alt=""
            />
        <div className="mx-2">
            <h4 className="mx-2 font-medium text-gray-800 dark:text-gray-200 ">
                Username
            </h4>
            <p className="mx-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                Role
            </p>
        </div>
        </div>
  )
}
