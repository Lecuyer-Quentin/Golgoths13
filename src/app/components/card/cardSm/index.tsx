'use client';

import { useState } from "react";
import { Article } from '@../../../types';
import InfoBtn from "@/app/components/button/infoBtn";
import { forEach } from "@/app/utils/forEach";
import {Image, Card as CardUI, CardBody, CardFooter, CardHeader} from "@nextui-org/react";
import { useRouter } from "next/navigation";


type Props = {
    data : Article
}


export default function CardSm({data} : Props) {
  const router = useRouter();

  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);
  if(!data) return null;
  const { _id, title, cover,description, tags } = data;
  const URL = `/articles/${_id}`

  const handlePress = () => {
    router.push(URL)
  }

  const renderArticleCover = (cover: string[], title: string) => {
    return (
        <Image removeWrapper 
        src={cover[0]} alt={title} className="z-0 w-full h-full object-cover"
        />
    )
  }

  const renderArticleTitle = (title: string) => {
    return (
        <h3 className={`font-bold text-lg text-center transition-all duration-300 line-clamp-2`}>
          {title}
        </h3>
    )
  }

  const renderArticleTags = (tags: string[]) => {
    return (
      <div className="absolute bottom-2 right-2">
        {forEach({of: tags, render: (tag: string) => {
          return (
            <span key={tag} className="bg-yellow-400 text-black text-sm font-bold rounded-full px-2 py-1 mx-1">
              {tag}
            </span>
          )
        }})}
      </div>
    )
  }

  const renderArticleDescription = (description: string) => {
    return (
        <p className={`absolute top-4 left-4 text-left text-sm font-bold w-full line-clamp-3 text-black`} >
          {description}
        </p>
    )
  }

  const renderContent = () => {
    return (
      <div className={`absolute bottom-0 left-0 rounded-b-xl flex flex-col justify-center items-center transition-all duration-300
                      ${hover 
                         ? "h-1/3 w-full bg-white after:bg-yellow-500 after:rounded-xl after:absolute after:bottom-4 after:left-50 after:w-4/5 after:h-[2px] "
                         : " w-full h-full bg-black bg-opacity-50 rounded-xl"}`}>
        {!hover ? renderArticleTitle(title) : null}
        {hover 
          ? InfoBtn()
          : renderArticleTags(tags)
        }
        {hover ? renderArticleDescription(description) : null}
      </div>
    )
  } 

  const renderCard = () => {
    return (
      <CardUI onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
              isPressable onPress={handlePress}
              className="w-[18rem] h-[22rem] rounded-xl relative text-white cursor-pointer">

          {cover ? renderArticleCover(cover as string[], title as string) : null}

          {renderContent()}
      </CardUI>
    )
  }

  return (
    <>
      {renderCard()}
    </>
  )
}

