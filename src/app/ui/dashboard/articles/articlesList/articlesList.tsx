'use client'

import { useEffect, useState } from 'react'
import { getSortedArticlesData } from '@/libs/articles'
import ArticleItem from './articleItem/articleItem';
import { Article } from '../../../../../../types';
import DeleteArticle from '../features/deleteArticle';
import UpdateArticle from '../features/updateArticle';


export default function ArticlesList() {
    const [allArticlesData, setAllArticlesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        setLoading(true);
        getSortedArticlesData()
        .then((articles) => {
            setAllArticlesData(articles);
            setLoading(false);
        })
        .catch((e) => {
            setError(e);
            setLoading(false);
        })
    }, []);

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error...</div>

    const renderArticles = allArticlesData.map((article : Article) => {
        return (
            <li key={article._id} className='flex flex-row justify-between mx-4'>
                <ArticleItem article={article} />
                <div className='flex flex-row space-x-4'>
                    <DeleteArticle id={article._id} />
                    <UpdateArticle article={article} />
                </div>
            </li>
        )}
    );

    const renderArticlesList = (
        <ul className='flex flex-col space-y-4 mt-4 border-2 border-gray-200 mx-4'>
            {renderArticles}
        </ul>
    );

    
    return renderArticlesList;
}