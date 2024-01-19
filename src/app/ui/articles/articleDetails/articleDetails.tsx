
import Image from 'next/image'
import { Article } from '../../../../../types';
import { forEach } from '@/app/utils/forEach';
import Error from '../../error/error';

type Props = {
  data: Article;
  error: Error | null;
  reset: () => void;
}


export default function ArticleDetails ({ data, error, reset }: Props) {

  if (error) return <Error error={error} reset={reset} />
  
  const { title, description, content, tags, cover, images } = data

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
      {data && renderArticleDetails()}
    </div>
  )
}

