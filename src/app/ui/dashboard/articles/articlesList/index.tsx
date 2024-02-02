'use client'

import ArticleItem from '../articleItem';
import { Article } from '../../../../../../types';
import {Accordion, AccordionItem} from "@nextui-org/react";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { FaCompressArrowsAlt } from "react-icons/fa";
import Error from '@/app/utils/error/error';
import { useState, useEffect } from 'react';
import { getSortedArticlesData } from '@/libs/articles';
import Loading from './loading';

type Props = {
  //  data: Article[];
  //  error: Error | null;
  //  reset: () => void;
}


export default function ArticlesList() {

    const [data, setData] = useState<Article[]>([])
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(true)


    const getArticlesData = async () => {
        try {
            const data = await getSortedArticlesData()
            return data
        } catch (error) {
            return error
        }
    }

    useEffect(() => {
        getArticlesData()
        .then((data) => {
            setData(data)
        })
        .catch((error) => {
            setError(error as Error)
        })
        .finally(() => {
            setLoading(false)
        })
    }
    , [ error ])
    

    
    const renderArticlesList = (
        <Accordion selectionMode='multiple' variant="splitted" className='w-full h-full'>
            {data.map((article: Article) => {
                return (
                    <AccordionItem key={article._id} title={article.title} 
                        style={{
                                borderBottom: '2px solid black',
                                borderRadius: '0.5rem',
                                padding: '0.5rem',
                                marginLeft: '0.5rem',
                                marginRight: '0.5rem',
                            }}
                        indicator={({isOpen}) => (
                            isOpen 
                                ? <FaCompressArrowsAlt className='text-yellow-500' />
                                : <FaExpandArrowsAlt />)}>

                        <ArticleItem article={article} />
                    </AccordionItem>
                )
            })}
        </Accordion>
    )

    if(!data) return null
    if(error) return <Error error={error} reset={getArticlesData} />
    if(loading) return <Loading />
    
    return renderArticlesList;
}