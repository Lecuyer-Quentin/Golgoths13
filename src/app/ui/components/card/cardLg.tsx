'use client';

import Image from "next/image";
import { useState } from "react";
import Link from 'next/link';
import { Article } from '../../../../../types';
import InfoBtn from "../button/infoBtn";
import { forEach } from "@/app/utils/forEach";


type Props = {
    data : Article
}


export default function CardSm({data} : Props) {

  const { _id, title, description, cover, tags } = data; 
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);
  const URL = `/page/articles/${_id}`;


  const renderArticleCover = (cover: string[], title: string) => {
    return (
      <>
        <Image src={cover[0]} alt={title} fill sizes='auto' className='object-cover' />
      </>
    )
  }

  const renderArticleTitle = (title: string) => {
    return (
      <>
        <h3 className={` font-bold text-lg line-clamp-2
                            ${hover 
                                ? " w-full relative bottom-20 left-2"
                                : " relative top-34 "}`}>
          {title}
        </h3>
      </>
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
      <p className="absolute bottom-34 left-4 text-sm font-bold w-4/5 line-clamp-3">
        {description}
      </p>
    )
  }

  const renderCard = () => {
    return(
      <Link href={URL}>
        <article onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="lg:w-[36rem] w-[18rem] h-[22rem] rounded-xl relative text-white overflow-hidden cursor-pointer shadow-xl">
          {cover ? renderArticleCover(cover as string[], title as string) : null}
          <div className={`absolute bottom-0 right-0 rounded-r-xl flex flex-col justify-center items-center transition-all duration-300
                           ${hover 
                              ? "w-4/5 md:w-3/5 h-full bg-black after:bg-yellow-500 after:rounded-xl after:absolute after:bottom-4 after:left-50 after:w-4/5 after:h-[2px] "
                              : " w-full h-full bg-black bg-opacity-50 rounded-xl"}`}>
              {title ? renderArticleTitle(title as string) : null}
              {hover ? InfoBtn() : renderArticleTags(tags as string[])}
              {hover ? renderArticleDescription(description as string) : null}
          </div>
        </article>
      </Link>
    )}





  return (
    <>
      {renderCard()}
    </>
  )
}

