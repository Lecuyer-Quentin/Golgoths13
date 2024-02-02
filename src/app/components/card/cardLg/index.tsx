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
  const { _id, title, description, cover, tags } = data; 
  const URL = `/articles/${_id}`;

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
        <h3 className={` font-bold text-lg line-clamp-2
                            ${hover 
                                ? " w-full relative bottom-20 text-left left-5 "
                                : " relative top-34 "}`}>
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
      <p className="absolute text-sm font-bold w-4/5 line-clamp-3 text-left left-5">
        {description}
      </p>
    )
  }

  const renderContent = () => {
    return (
      <div className={`absolute bottom-0 right-0 rounded-r-xl flex flex-col justify-center items-center transition-all duration-300 z-40
           ${hover 
              ? "w-4/5 md:w-3/5 h-full bg-black after:bg-yellow-500 after:rounded-xl after:absolute after:bottom-4 after:left-50 after:w-4/5 after:h-[2px] "
              : " w-full h-full bg-black bg-opacity-50 rounded-xl"}`}>
        {title ? renderArticleTitle(title as string) : null}
        {hover ? renderArticleDescription(description as string) : null}
        {hover ? InfoBtn() : renderArticleTags(tags as string[])}
      </div>
    )
  }

  const renderCard = () => {
    return (
      <CardUI onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
              isPressable onPress={handlePress}
              className="lg:w-[36rem] w-[18rem] h-[22rem] rounded-xl relative text-white cursor-pointer shadow-xl">
        
          {renderContent()}

          {cover ? renderArticleCover(cover as string[], title as string) : null}

      </CardUI>
    )
  }

  return (
    <>
      {renderCard()}
    </>
  )
}

