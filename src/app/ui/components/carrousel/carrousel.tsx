'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "../../../../../types";
import Slider from "react-slick";
import { FaArrowRightLong } from "react-icons/fa6";


type Props = {
    data: Article[];
};

export default function Carrousel({data}:Props) {
    const [active, setActive] = useState(0);
    if(!data) return null;
    const URL = `/page/articles/${data[active]._id}`



    const settings = {
        fade: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: false,
        afterChange: (current: number) => setActive(current),
        customPaging: function(i: number) {
            return (
                <div className={`${active === i ? 'opacity-100 text-yellow-400' : 'opacity-50'} 
                    w-32 h-12 hidden md:flex flex-col relative top-5 text-white-400 hover:opacity-100 transition duration-500 ease-in-out`}>
                    <h4 className="text-lg absolute left-0">{data[i].title.substring(0,15)+'...'}</h4>
                    <hr className={`${active === i ? 'opacity-100 border-yellow-400' : 'opacity-50'} border-white w-full absolute bottom-5`} />
                    <div className="flex justify-between absolute right-0 bottom-0">
                        <span className="text-sm">{data[i].tags}</span>
                    </div>
                </div>
            )
        },
        dots: true,
        className:" w-full md:h-[36rem] relative",
        appendDots: (dots: any) => (
            <ul style={{ 
              height: "25%",
              display: "grid",
              paddingLeft: "7rem",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(1, 1fr)",
              }}
              > {dots} </ul>
        ),
          
    };

    const renderContent = (item: Article) => {
        const {_id, title, description} = item;
        return (
            <Link href={URL}>
                <div className="absolute top-10 left-8 flex-col justify-around p-5 h-1/2 w-2/3 cursor-pointer">
                    <FaArrowRightLong className="text-yellow-400 text-2xl absolute top-0 left-6" />
                    <h2 className="text-white text-2xl my-2">{title}</h2>
                    <p className="text-white text-xl">{description}</p>
                </div>
            </Link>
        )
    }

    const renderCover = (item: Article) => {
        const {cover, title} = item;
        const coverUrl = cover[0]
        return (
            <Image src={coverUrl as string} alt={title} fill sizes="100%" className="absolute object-cover" />
        )
    }

    return (
        <>
            <Slider {...settings}>
                {data.map((item,_id) => (
                    <div key={_id} className="h-screen md:h-[36rem] w-full relative" >
                        {renderCover(item)}
                        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-r from-black"></div>
                        {renderContent(item)}
                    </div>
                ))}               
            </Slider>
        </>
    )
}


   