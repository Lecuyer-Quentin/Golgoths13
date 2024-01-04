'use client'

import React from 'react'
import CardSm from '../card/cardSm'
import Slider from 'react-slick'
import { Article } from '../../../../../types'
//import "slick-carousel/slick/slick.css"; 
//import "slick-carousel/slick/slick-theme.css";

type Props = {
    data: Article[];
}

export default function CarrouselSm({data}: Props) {

    const settings = {
        dots: false,
        infinite: true,
        speed: 2500,
        slidesToShow: 4,
        arrows: false,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [

            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },

            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 640,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
          ]
      };
  return (
    <>
        <Slider {...settings} className="px-12 ml-12 lg:ml-0
        overflow-hidden">
            {data.map((item : Article, i: number) => (
                <CardSm key={item._id} data={item} />
            ))}
        </Slider>

    </>
  )
}
