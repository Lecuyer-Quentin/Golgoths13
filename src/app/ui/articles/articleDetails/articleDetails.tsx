'use client'

import { getArticleDataById } from '@/libs/articles';
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Article } from '../../../../../types';
import {useParams} from 'next/navigation'


export default function ArticleDetails() {
  const { id } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [articleDetails, setArticleDetails] = useState<Article>()

  useEffect(() => {
    getArticleDataById(id as string)
      .then((res) => {
        setArticleDetails(res)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err)
        setIsLoading(false)
      })
  }
  , [ id ])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error...</div>

  const renderArticleCover = (cover: string[], title: string) => {
    return (
      <div className='flex flex-col w-full h-full'>
        <Image src={cover[0]} alt={title} width={200} height={200} />
      </div>
    )
  }

  const renderArticleImages = (images: string[], title: string) => {
    return (
      <div className='flex flex-col w-full h-full'>
        {images && images.map((image) => {
          return (
            <div key={image} className='flex flex-col w-full h-full'>
              <Image src={image} alt={title} width={200} height={200} />
            </div>
          )
        })}
      </div>
    )
  }

  const renderArticleDetails = (articleDetails: Article) => {
    const { title, description, content, tags, cover, images } = articleDetails
    return (
      <article className='flex flex-col w-full h-full'>
        <div className='flex flex-col w-full h-full'>
          <h1>{title}</h1>
          <p>{description}</p>
          <p>{content}</p>
          <p>{tags}</p>
        </div>
        <div className='flex flex-col w-full h-full'>
          {articleDetails && renderArticleCover(cover as string[], title as string)}
        </div>
        <div className='flex flex-col w-full h-full'>
          {articleDetails && renderArticleImages(images as string[], title as string)}
        </div>
        
      </article>
    )
  }

  return (
    <div className='flex flex-col w-full h-full'>
      {articleDetails && renderArticleDetails(articleDetails)}
    </div>
  )
}

