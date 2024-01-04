'use client';

import Image from "next/image";
import { useState } from "react";
import Link from 'next/link';
import { Article } from '../../../../../types';

type Props = {
    data : Article;
}


export default function Card({data} : Props) {

  const [hover, setHover] = useState(false);
  const toggleHover = () => setHover(!hover);
  if(!data) return null
  const { _id, title, description, cover } = data;
  const URL = `/articles/${_id}`
  const coverUrl = cover[0]

  return (

    <Link href={URL}>
      <article onMouseEnter={toggleHover} onMouseLeave={toggleHover} className="w-[22rem] h-[32rem] bg-white rounded-xl relative text-black overflow-hidden shadow-xl">
        <Image src={coverUrl as string} width={360} height={200}
             alt={title} className="rounded-t-xl h-2/3 object-cover object-center "  />

        <div className="flex flex-col justify-around items-center h-1/3 px-4 py-2">
          <h3 className="text-center font-bold text-lg">{title}</h3>
          <p className="text-center text-sm">{description}</p>
          <button className={`bg-yellow-400 w-1/2 h-8 rounded-xl flex justify-center items-center font-bold transition-all duration-500 
                              ${hover 
                                ? 'border-2 border-black'
                                : 'border-2 border-yellow-400'}`} >
            + d&apos;infos
          </button>
        </div>
      </article>
    </Link>
    
  )
}

