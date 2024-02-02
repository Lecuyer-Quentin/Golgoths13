'use client';

import { useState } from "react";
import { Article } from '@../../../types';
import InfoBtn from "@/app/components/button/infoBtn";
import { forEach } from "@/app/utils/forEach";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {Card as CardUI, CardBody, CardFooter} from "@nextui-org/react";


type Props = {
    data : Article;
}


export default function Card({data} : Props) {
  const router = useRouter();

  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  if(!data) return null
  const { _id, title, cover, tags } = data as Article;
  const URL = `/articles/${_id}`

  const handlePress = () => {
    router.push(URL)
  }


  const renderArticleTitle = (title: string) => {
    return (
        <h3 className="font-bold text-lg absolute top-5 left-6">
          {title}
        </h3>
    )
  }

  const renderArticleTags = (tags: string[]) => {
    return (
      <div className="absolute bottom-10 right-10">
        {forEach({of: tags, render: (tag: string) => {
          return (
            <span key={tag} className="bg-yellow-400 text-sm text-black font-bold rounded-xl px-3 py-2 mx-1">
              {tag}
            </span>
          )
        }})}
      </div>
    )
  }

  const renderCover = () => {
    return (
      <Image src={cover[0]} layout="fill" objectFit="cover"
                  alt={title} className="rounded-t-xl" />
    )
  }

  const renderSpacer = () => {
    return (
      <hr className="w-4/5 border-1 border-yellow-400 bottom-4 absolute" />
    )
  }

  const renderCard = () => {
    return (
      <CardUI onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
              isPressable onPress={handlePress}
              className="w-[22rem] h-[32rem] shadow-xl flex flex-col justify-between items-center cursor-pointer">

        <CardBody className="h-[16rem]">
          {cover ? renderCover() : null}
        </CardBody>

        <CardBody>
          {title ? renderArticleTitle(title as string) : null}
        </CardBody>

        {renderSpacer()}

        <CardFooter>
          {hover ? InfoBtn() : renderArticleTags(tags as string[])}
        </CardFooter>
      </CardUI>
    )
  }

  return (
    <>
      {renderCard()}
    </>
  )
}

