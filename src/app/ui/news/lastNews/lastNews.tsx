'use client'

import { useEffect, useState } from 'react'
import { getSortedArticlesData } from '@/libs/articles'
import Table from '../../components/table/table';

export default function LastNews() {
    const [lastNewsData, setLastNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getSortedArticlesData()
            .then((res) => {
                res = res.slice(0, 7);
                setLastNewsData(res);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            })
    }, []);

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error...</div>

    const renderLastNews = () => {
      return (
        <section className="w-full py-8 border border-gray-200 px-4">
          <div className="flex items-center justify-start mb-10">
            <h2 className="text-4xl font-bold">Last News</h2>
          </div>
          <Table data={lastNewsData} />
        </section>
      )
    }

    return renderLastNews();

  
}
