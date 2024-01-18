'use client'

import { useEffect, useState } from 'react'
import { getSortedArticlesData } from '@/libs/articles'
import Table from '../../../components/table/table';
import Loading from '../../loading/loading';
import Error from '../../error/error';

export default function ArticlesList() {
    const [articlesListData, setArticlesListData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchArticlesListData = async () => {
        getSortedArticlesData()
            .then((res) => {
                setArticlesListData(res);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            })
    }


    useEffect(() => {
        fetchArticlesListData();
    }, []);

    if (isLoading) return <Loading numberOfItems={3}  />
    if (error) return <Error error={error} reset={ fetchArticlesListData } />

    const renderTable = () => {
      return (
            <Table data={articlesListData} />
      )
    }
  return renderTable();
}
