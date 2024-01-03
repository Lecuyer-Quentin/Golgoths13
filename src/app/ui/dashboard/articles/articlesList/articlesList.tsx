'use client'

import { useEffect, useState } from 'react'
import { getSortedArticlesData } from '@/libs/articles'
import ArticleItem from './articleItem/articleItem';
import { Article } from '../../../../../../types';
import DeleteArticle from '../features/deleteArticle';
import UpdateArticle from '../features/updateArticle';


export default function ArticlesList() {
    const [allArticlesData, setAllArticlesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSortedArticlesData();
            setAllArticlesData(data);
        };
        fetchData();
    }, []);

    return (
            <ul className='flex flex-col space-y-4 mt-4 border-2 border-gray-200 mx-4'>
                {allArticlesData.map((article : Article) => (
                    <div key={article._id} className='flex flex-row justify-between mx-4'>
                        <ArticleItem  article={article} />
                        <div className='flex flex-row space-x-4'>
                            <DeleteArticle id={article._id} />
                            <UpdateArticle article={article} />
                        </div>
                    </div>
                ))}
            </ul>
    )
}