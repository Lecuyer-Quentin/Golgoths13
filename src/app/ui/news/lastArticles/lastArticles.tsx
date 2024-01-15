'use client'

import { use, useEffect, useState } from 'react'
import { getSortedArticlesData } from '@/libs/articles'
import CarrouselSm from '@/app/components/carrousel/carrouselSm';
import Link from 'next/link';
import Error from '@/app/ui/error/error';
import { Article } from '@../../../types';

export default function LastArticles() {
    const [lastArticlesData, setLastArticlesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const URL = '/page/articles';

    //todo - change this to get only articles
    const fetchData = () => {
        setIsLoading(true);
        getSortedArticlesData()
            .then((res) => {
              res = res.filter((article : Article) => {
                return article.tags && article.tags.includes('#article');
              });

                //res = res.slice(0, 5);
                setLastArticlesData(res);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        fetchData();
    } , [])

    if (isLoading) return <div>Loading...</div>
    if (error) return <Error error={error} reset={fetchData} />

    const renderLastArticles = () => {
      return (
        <section className="w-full py-10">
          <div className="flex items-center justify-between mx-4 mb-8">
            <h2 className="text-4xl font-bold">Last Articles</h2>
            <Link href={URL}>
              View all
            </Link>
          </div>
          <CarrouselSm data={lastArticlesData} />
        </section>
      )
    }

    return renderLastArticles();


}