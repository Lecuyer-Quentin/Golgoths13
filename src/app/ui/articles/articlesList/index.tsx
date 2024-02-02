'use client'
 
import Table from '../../../components/table/table';
import Error from '../../../utils/error/error';
import { Article } from '@/../../../../types';
import { useState, useEffect } from "react";
import { getSortedArticlesData } from '@/libs/articles';
import Loading from './loading';

type Props = {
 // data: Article[]
 // error: Error | null
 // reset: () => void
}

export default function ArticlesList() {

  const [data, setData] = useState<Article[]>([]);  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

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

    const renderTable = () => {
      return (
            <Table data={data} />
      )
    }

    if(error) return <Error error={error} reset={getArticlesData} />
    if(loading) return <Loading />
    
  return renderTable();
}
