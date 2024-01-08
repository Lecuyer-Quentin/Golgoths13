'use client'

import { useEffect, useState } from 'react'
import { getSortedArticlesData } from '@/libs/articles'
import Table from '../../components/table/table';
import Link from 'next/link';
import Error from '../../error/error';

export default function LastNews() {
    const [lastNewsData, setLastNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

  
    const fetchData = () => {
        setIsLoading(true);
        getSortedArticlesData()
            .then((res) => {
                res = res.slice(0, 5);
                setLastNewsData(res);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        fetchData();
    }, [])



    if (isLoading) return <div>Loading...</div>
    if (error) return <Error error={error} reset={fetchData} />

    const renderLastNews = () => {
      return (
        <section id='lastNews' className="w-full h-auto py-10 ">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold">Last News</h2>
            <Link href="/news">
              See all
            </Link>
          </div>
          <Table data={lastNewsData} />
        </section>
      )
    }

    return renderLastNews(); 
}
