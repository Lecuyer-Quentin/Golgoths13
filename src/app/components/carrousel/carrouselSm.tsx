'use client'

import React from 'react'
import CardSm from '../card/cardSm'
import Slider from 'react-slick'
import { Article } from '@../../../types'

type Props = {
    data: Article[];
}

export default function CarrouselSm({data}: Props) {

  if(!data) return null;

    const settings = {
        dots: false,
        infinite: true,
        speed: 2500,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        

        responsive: [
          {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,                
            }},
            {
              breakpoint: 960,
              settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  className: "center",
                  centerMode: true,
                  centerPadding: "10px",
              }},
            
          {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }},
          {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                className: "center",
                centerMode: true,
                centerPadding: "50px",

            }},
            {
              breakpoint: 540,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  className: "center",
                  centerMode: true,
                  centerPadding: "40px",
              }},
          {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                className: "center",
                centerMode: true,
                centerPadding: "20px",
            }}
        ]

        
            }
       

      const renderSlider = () => {
        return (
          data.map((article : Article) => {
            return (
                <CardSm key={article._id} data={article} />
            )
          })
        )
      }

  return (
    <>
        <Slider {...settings}>
            {renderSlider()}
        </Slider>
    </>
  )
}
