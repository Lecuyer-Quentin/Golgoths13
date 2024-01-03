import Link from 'next/link'

type Props = {
    subItem: {
        title: string
        link: string
        icon: JSX.Element
    }
}

export default function MenuLink({ subItem }: Props) {
  return (
    <li key={subItem.title} className="relative px-6 py-3 mb-1 hover:bg-gray-200 dark:hover:bg-gray-700">
        <span className="absolute inset-y-0 left-0 w-1 bg-yellow-400 rounded-tr-lg rounded-br-lg" aria-hidden="true" />
        <Link href={subItem.link} className='flex items-center'>
            {subItem.icon}
            <span className="ml-4 text-sm font-medium">          
              {subItem.title}
            </span>
        </Link>
    </li>
  )
}
