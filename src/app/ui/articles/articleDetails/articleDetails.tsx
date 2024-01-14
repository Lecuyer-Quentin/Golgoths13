'use client'

import { getArticleDataById } from '@/libs/articles';
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Article } from '../../../../../types';
import {useParams} from 'next/navigation'
import { forEach } from '@/app/utils/forEach';
import Error from '../../error/error';


export default function ArticleDetails () {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [articleDetails, setArticleDetails] = useState<Article | null>(null)

  const fetchData = ( {id} : {id: string}) => {
    setIsLoading(true)
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

  useEffect(() => {
    fetchData({id : id as string})
  }, [ id ])

  if (!articleDetails) return null
  const { title, description, content, tags, cover, images } = articleDetails as Article
  if (isLoading) return <div>Loading...</div>
  if (error) return <Error error={error} reset={() => fetchData({id : id as string})} />

  const renderArticleCover = () => {
   return (
        <Image src={cover[0]} alt={title} width={200} height={200} />
    )
  }

  const renderArticleImages = () => {
    return (
      <div className='grid grid-cols-2 gap-4 w-full h-full p-4 justify-items-center border-2 border-red-500'>
        {images && forEach({of: images, render: (image: string) => {
          return (
              <Image key={image} src={image} alt={title} width={200} height={200} />
          )
        }
        })}
      </div>
    )
  }

  const renderArticleDetails = () => {
    return (
      <article className='flex flex-col w-full h-full'>
        <div className='flex flex-col w-full h-full'>
          <h1>{title}</h1>
          <p>{description}</p>
          <p>{content}</p>
          <p>{tags}</p>
        </div>
        <div className='flex flex-col w-full h-full'>
          {cover && renderArticleCover()}
        </div>
        <div className='flex flex-col w-full h-full'>
          {images && renderArticleImages()}
        </div>
        
      </article>
    )
  }

  return (
    <div className='flex flex-col w-full h-full justify-center items-center'>
      {articleDetails && renderArticleDetails()}
    </div>
  )
}

