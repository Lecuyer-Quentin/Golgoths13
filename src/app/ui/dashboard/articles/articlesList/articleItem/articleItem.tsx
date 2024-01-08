import { Tooltip } from '@nextui-org/react';
import { Article } from '../../../../../../../types'
import DeleteArticle from '../../features/deleteArticle';
import UpdateArticle from '../../features/updateArticle';
import Image from 'next/image';
import { FaRegEye } from "react-icons/fa6";
import Link from 'next/link';
import { useState } from 'react';



type Props = {
    article: Article
    }

export default function ArticleItem({ article }: Props) {

    const { title, description, tags, cover, images, content} = article;

    const [active, setActive] = useState(false);
    
    const renderArticleTags = (
        <div className='flex flex-row justify-start items-center'>
            {tags.map((tag, index) => {
                return (
                    <p key={index} className='text-xs bg-yellow-200 rounded-md px-1 mx-1'>{tag}</p>
                )
            })}
        </div>
    )

    const renderArticleDescription = (
            <p className='mx-2 line-clamp-3'>
                {description}
            </p>
    )

    const renderArticleCover = () => {
        return (
        <div className='mx-2 flex flex-row justify-start items-center'>
            <Image 
                src={cover[0]}
                alt='cover'
                width={50}
                height={20}
                className='rounded-md'
            />
        </div>
    )}

    const renderArticleImages = (
        <div className='mx-2 flex flex-row justify-start items-center flex-wrap gap-2'>
            {images.map((image, index) => {
                return (
                    <Image 
                        key={index}
                        src={image}
                        alt='image'
                        width={50}
                        height={50}
                        className='rounded-md'
                    />
                )
            })}
        </div>
    )

        const renderArticleContent = (content: string) => {
            const paragraphs = content.split('\n');

            return (
                <div className='flex flex-col justify-start items-start mx-2 '>
                    {paragraphs.map((paragraph, index) => {
                        return (
                            <p key={index} className={active ? '' : 'line-clamp-3'}>
                                {paragraph}
                            </p>
                        )
                    })}
                </div>
            )
        }



  return (
    <article className='flex flex-col w-full h-full justify-between items-center relative'>
        <div className='grid grid-cols-2 gap-2 w-full h-full'>

            <div className='flex flex-row justify-start items-start'>
                <span className='font-bold'>Description:</span> 
                {renderArticleDescription}
            </div>
            <div className='flex flex-row justify-start items-start'>
                <span className='font-bold'>Tags: </span> 
                {renderArticleTags}
            </div>
            <div className='flex flex-row justify-start items-start'>
                <span className='font-bold'>Cover: </span> 
                {renderArticleCover()}
            </div>
            <div className='flex flex-row justify-start items-start'>
                <span className='font-bold'>Images: </span> 
                {renderArticleImages}
            </div>
            
        </div>
        <div className='flex flex-row justify-start items-start mt-4 w-full'>
            <div className='flex flex-col justify-start items-center'>
                <span className='font-bold'>Content: </span> 
                <Tooltip content='Expand content' className='text-black' placement='bottom'>
                    <div>
                    <FaRegEye onClick={() => setActive(!active)} />
                    </div>
            </Tooltip>
            </div>
            
                {renderArticleContent(content)}
        </div>
        <div className='w-full flex flex-row justify-end items-center'>
            <Tooltip content='View article' className='text-yellow-500' placement='top'>
                <Link href={`/articles/${article._id}`}>
                    <FaRegEye />
                </Link>
            </Tooltip>
            <UpdateArticle article={article} />
            <DeleteArticle id={article._id} />
        </div>
    </article>
    )
}
