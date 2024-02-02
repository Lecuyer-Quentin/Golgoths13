'use client'

import Image from 'next/image'
import { Article } from '../../../../../types';
import Error from '../../../utils/error/error';
import { getArticleDataById } from '@/libs/articles';
import { useCallback, useEffect, useState } from 'react';

type Props = {
 //data: Article;
 //error: Error | null;
 //reset: () => void;
 id : string;
}


export default function ArticleDetails ({ id }: Props) {

  const [data, setData] = useState<Article | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const getArticleData = useCallback(async () => {
    try {
      const articleData = await getArticleDataById(id)
      return articleData
    } catch (error) {
      return error
    }
  }
  , [ id ])

  useEffect(() => {
    getArticleData()
    .then((data) => {
      setData(data)
    })
    .catch((error) => {
      setError(error as Error)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [ error, getArticleData ])
  
  if(!data) return null
  const { title, description, content, tags, cover, images } = data || {}

  const renderCover = () => {
    return (
      <Image src={cover[0]}  objectFit="cover" width={200} height={200}
                  alt={title} className="rounded-t-xl" />
    )
  }

  const renderImages = () => {
    return (
      <div className='flex flex-col w-full h-full'>
        {images && images.map((image) => {
          return (
            <Image key={image} src={image}  objectFit="cover" width={200} height={200}
                  alt={title} className="rounded-t-xl" />
          )
        })}
      </div>
    )
  }



  if(error) return <Error error={error} reset={getArticleData} />
  if(loading) return <div>Loading...</div>  



  const renderArticleDetails = () => {
    return (
      <article className='flex flex-col w-full h-full'>
        <div className='flex flex-col w-full h-full'>
          <h1>{title}</h1>
          <p>{description}</p>
          <p>{content}</p>
          <p>{tags}</p>
        </div>
        <div className='flex flex-col w-full h-[20rem] '>
          {cover && renderCover()}
        </div>
        <div className='flex flex-col w-full h-full'>
          {images && renderImages()}
        </div>
        
      </article>
    )
  }

  return (
    <div className='flex flex-col w-full h-full justify-center items-center'>
      {data && renderArticleDetails()}
    </div>
  )
}

