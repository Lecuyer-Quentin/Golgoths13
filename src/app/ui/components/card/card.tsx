'use client';

import Image from "next/image";
import { useState } from "react";
import Link from 'next/link';
import { Article } from '../../../../../types';
import InfoBtn from "../button/infoBtn";

type Props = {
    data : Article;
}


export default function Card({data} : Props) {

  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => setHover(true);
  const handleMouseLeave = () => setHover(false);

  if(!data) return null
  const { _id, title, cover, tags } = data;
  const URL = `/page/articles/${_id}`

  const renderArticleCover = (cover: string[], title: string) => {
    return (
      <>
        <Image src={cover[0]} width={360} height={200}
             alt={title} className="rounded-t-xl h-2/3 object-cover object-center " />
      </>
    )
  }

  const renderArticleTitle = (title: string) => {
    return (
      <>
        <h3 className="font-bold text-lg absolute top-10 left-10">
          {title}
        </h3>
      </>
    )
  }

  const renderArticleTags = (tags: string[]) => {
    return (
      <div className="absolute bottom-10 right-10">
        {tags.map((tag) => {
          return (
            <span key={tag} className="bg-yellow-400 text-sm font-bold rounded-xl px-2 py-1 m-1">
              {tag}
            </span>
          )
        })}
      </div>
    )
  }


  const renderCard = () => {
    return (
      <Link href={URL}>
        <article onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="w-[22rem] h-[32rem] rounded-t-xl text-black overflow-hidden shadow-xl">
          {data && renderArticleCover(cover as string[], title as string)}
          <div className="flex flex-col justify-around items-center h-1/3 py-2 bg-white relative">
            {data && renderArticleTitle(title as string)}
            <hr className="w-4/5 border-1 border-yellow-400"/>
            {hover 
              ? InfoBtn()
              : renderArticleTags(tags as string[])
            }
          </div>
        </article>
      </Link>
    )
  }

  return (
    <>
      {data && renderCard()}
    </>
  )
}

