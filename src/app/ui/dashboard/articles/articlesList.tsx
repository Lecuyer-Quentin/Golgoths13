'use client'

import { useEffect, useState } from 'react'
import { getSortedArticlesData } from '@/libs/articles'
import ArticleItem from './articleItem/articleItem';
import { Article } from '../../../../../types';
import Error from '@/app/ui/error/error';
import {Accordion, AccordionItem} from "@nextui-org/react";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { FaCompressArrowsAlt } from "react-icons/fa";






export default function ArticlesList() {
    const [allArticlesData, setAllArticlesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = () => {
        setLoading(true);
        getSortedArticlesData()
            .then((res) => {
                setAllArticlesData(res);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            })
    }
     useEffect(() => {
        fetchData();
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <Error error={error} reset={fetchData} />      
   
    const renderArticlesList = (
        <Accordion selectionMode='multiple' variant="splitted" className='w-full h-full'>
            {allArticlesData.map((article: Article) => {
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
    
    return renderArticlesList;
}