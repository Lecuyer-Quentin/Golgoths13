'use client'

import { useEffect, useState } from 'react'
import { getSortedArticlesData } from '@/libs/articles'
import Table from '../../../components/table/table';
import Error from '../../error/error';
import Loading from '../../loading/loading';

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


    if (isLoading) return <Loading numberOfItems={4}  />
    if (error) return <Error error={error} reset={fetchData} />

    const renderLastNews = () => {
      return (
        
          <Table data={lastNewsData} />

          )
    }

    return renderLastNews();

  
}
