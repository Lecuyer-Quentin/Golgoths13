'use client'

import ArticleItem from './articleItem/articleItem';
import { Article } from '../../../../../types';
import {Accordion, AccordionItem} from "@nextui-org/react";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { FaCompressArrowsAlt } from "react-icons/fa";
import Error from '@/app/ui/error/error';

type Props = {
    data: Article[];
    error: Error | null;
    reset: () => void;
}


export default function ArticlesList({ data, error, reset }: Props) {

    if (error) return <Error error={error} reset={reset} />
    
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
    
    return renderArticlesList;
}