import {Button} from "@nextui-org/react";
import Link from 'next/link';

type LinkProps = {
  name: string;
  href: string;
}

const LinkList = [
  {
    name: 'Last news',
    href: '/page/news'
  },
  {
    name: 'Become a member',
    href: '#banner'
  },
  {
    name: 'Last result',
    href: '#hero'
  },
  {
    name: 'Next match',
    href: '#hero'
  }
]

const StaticText = {
  title: 'Welcome to the official website of Golgoths 13 Basketball Club, where passion meets precision on the court!',
  description: 'As a proud and dynamic basketball community, Golgoths 13 is more than just a club – it\'s a family united by the love for the game.'
}

export default function Cta() {

  const renderTitle = () => {
    return (
      <h1 className="text-xl">
        {StaticText.title}
      </h1>
    )
  }
  const renderDescription = () => {
    return (
      <h2 className="text-lg text-right">
        {StaticText.description}
      </h2>
    )
  }
  const renderLink = (link : LinkProps) => {
    return (
      <Button
        key={link.name}
        className="bg-yellow-400 border-2 border-yellow-400 text-black hover:bg-transparent hover:text-yellow-400"
      >
        <Link href={link.href} >
        {link.name}
        </Link>
      </Button>
    )
  }
  const renderLinksList = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {LinkList.map((link) => renderLink(link))}
      </div>
    )
  }

  const renderWidget = () => {
    return (
      <iframe id="64eb2b01474ef208cf9dcc78" height="520" src="https://v1.scorenco.com/widget/64eb2b01474ef208cf9dcc78/" className="display: block; width: 100%; overflow: auto; margin: auto; border-width: 0px;
        scrollbar-width: none; scrollbar-hide
      "></iframe>
    )
  }

  return (
<>

      <article className="font-bold text-left h-[50%]
                          lg:text-left">
        {renderTitle()}
        <br />
        {renderDescription()}
      </article>

      <aside className=" h-[50%]">
        {renderLinksList()}
      </aside>
      <aside className=" sm:hidden lg:block absolute bottom-5 right-40 border-2 border-yellow-400 scrollbar-none">
        {renderWidget()}
      </aside>

  </>
  )
}
