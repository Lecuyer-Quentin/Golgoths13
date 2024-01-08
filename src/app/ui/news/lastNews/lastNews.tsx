'use client'

import { useEffect, useState } from 'react'
import { getSortedArticlesData } from '@/libs/articles'
import Table from '../../components/table/table';
import Error from '../../error/error';

export default function LastNews() {
    const [lastNewsData, setLastNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //todo - change this to get only news
    const fetchData = () => {
        setIsLoading(true);
        getSortedArticlesData()
            .then((res) => {
                //res = res.slice(0, 5);
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
        <section className="w-full">
          <div className="flex items-center justify-start mx-4 mb-8">
            <h2 className="text-4xl font-bold">Last News</h2>
          </div>
          <Table data={lastNewsData} />
        </section>
      )
    }

    return renderLastNews();

  
}
