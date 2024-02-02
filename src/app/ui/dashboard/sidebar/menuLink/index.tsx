'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'

type Props = {
    subItem: {
        title: string
        link: string
        icon: JSX.Element
    }
}

export default function MenuLink({ subItem }: Props) {

  const router = useRouter()

  const handlePress = () => {
    router.push(subItem.link)
  }


  const renderButton = () => {
    return(
      <Button onPress={handlePress} startContent={subItem.icon}
              className='flex items-center justify-start w-full bg-transparent text-yellow-400'>
        <span className="ml-4 text-sm font-medium text-white ">          
          {subItem.title}
        </span>
      </Button>
    )
  }

  const renderListItem = () => {
    return (
      <li key={subItem.title} className="relative px-6 py-3 mb-1 group">
          <span className="absolute inset-y-0 left-0 w-1 bg-yellow-400 rounded-tr-lg rounded-br-lg group-hover:bg-red-600" aria-hidden="true" />
          {renderButton()}
      </li>
    )
  }
  return renderListItem()
}