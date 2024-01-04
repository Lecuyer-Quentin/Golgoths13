'use client';

import Image from "next/image";
import { useState } from "react";
import Link from 'next/link';
import { Article } from '../../../../../types';

type Props = {
    data : Article
}


export default function CardSm({data} : Props) {

  const { _id, title, description, cover } = data; 
  const [hover, setHover] = useState(false);
  const toggleHover = () => setHover(!hover);
  const URL = `/articles/${_id}`;
  const coverUrl = cover[0];

  return (

    <Link href={URL} >
      <article onMouseEnter={toggleHover} onMouseLeave={toggleHover} className="lg:w-[36rem] w-[18rem] h-[22rem] rounded-xl relative text-white overflow-hidden cursor-pointer">
        <Image src={coverUrl as string} alt={title} fill sizes='auto' className='object-cover' />

        <div className={`group absolute bottom-0 right-0 rounded-r-xl flex justify-center items-center transition-all duration-300
                         ${hover 
                            ? "w-4/5 md:w-3/5 h-full bg-black after:bg-yellow-500 after:rounded-xl after:absolute after:bottom-4 after:left-50 after:w-4/5 after:h-[2px] "
                            : " w-full h-full bg-black bg-opacity-50 rounded-xl"}`}>
            <h3 className={` font-bold text-lg text-white transition-all duration-300
                            ${hover 
                                ? " w-full relative bottom-6 left-2"
                                : " relative top-24 left-2 "}`}>
                                    {title}
            </h3>

            <button className={`absolute bottom-6 right-7 rounded-xl w-18 h-6 flex justify-center items-center border-2 border-yellow-500 text-yellow-500 px-2 transition-all duration-300
                            ${hover 
                                ? "opacity-100 group-hover:bg-yellow-500 group-hover:text-black group-hover:border-yellow-500"
                                : "opacity-0"}`}>
                 + d&apos;infos
            </button>
        </div>  
      </article>
    </Link>
    
  )
}

