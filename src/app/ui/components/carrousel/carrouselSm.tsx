'use client'

import React from 'react'
import CardSm from '../card/cardSm'
import Slider from 'react-slick'
import { Article } from '../../../../../types'
import { forEach } from '../../../utils/forEach'
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
             breakpoint: 1280,
             settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
             }
           },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 900,
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

      const renderSlider = () => {
        return forEach({of: data, render: (article : Article) => {
                return <CardSm key={article._id} data={article} />
            }
        })
      }

  return (
    <>
        <Slider {...settings} className="w-full h-full flex flex-row justify-center items-center ml-12 overflow-hidden">
            {renderSlider()}
        </Slider>
    </>
  )
}
