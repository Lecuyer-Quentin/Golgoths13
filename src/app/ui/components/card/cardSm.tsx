'use client';

import Image from "next/image";
import { useState } from "react";
import Link from 'next/link';
import { Article } from '../../../../../types';
import InfoBtn from "../button/infoBtn";


type Props = {
    data : Article
}


export default function CardSm({data} : Props) {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);
  if(!data) return null;
  const { _id, title, cover,description, tags } = data;
  const URL = `/page/articles/${_id}`

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
        <h3 className={`font-bold text-lg text-center transition-all duration-300 line-clamp-2`}>
          {title}
        </h3>
      </>
    )
  }


  const renderArticleTags = (tags: string[]) => {
    return (
      <div className="absolute bottom-2 right-2">
        {tags.map((tag) => {
          return (
            <span key={tag} className="text-sm font-bold px-1 py-1">
              {tag}
            </span>
          )
        })}
      </div>
    )
  }

  const renderArticleDescription = (description: string) => {
    return (
      <>
        <p className={`absolute top-4 left-3 text-sm font-bold w-3/6 line-clamp-3 text-black`} >
          {description}
        </p>
      </>
    )
  }




  return (

    <Link href={URL}>
      <article onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="w-[18rem] h-[22rem] rounded-xl relative text-white overflow-hidden cursor-pointer">
        {data && renderArticleCover(cover, title)}
        <div className={`absolute bottom-0 left-0 rounded-b-xl flex flex-col justify-center items-center transition-all duration-300
                         ${hover 
                            ? "h-1/3 w-full bg-white after:bg-yellow-500 after:rounded-xl after:absolute after:bottom-4 after:left-50 after:w-4/5 after:h-[2px] "
                            : " w-full h-full bg-black bg-opacity-50 rounded-xl"}`}>
            {data && !hover && renderArticleTitle(title)}
            {data && hover 
              ? InfoBtn()
              : renderArticleTags(tags)
            }
            {data && hover && renderArticleDescription(description)}
        </div>
      </article>
    </Link>
  )
}

