'use client'

import { useEffect, useState } from 'react'
import { getSortedArticlesData } from '@/libs/articles'
import Table from '../../../components/table/table';

export default function ArticlesList() {
    const [articlesListData, setArticlesListData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getSortedArticlesData()
            .then((res) => {
                setArticlesListData(res);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            })
    }, []);

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error...</div>

    const renderTable = () => {
      return (
        <section>
            <Table data={articlesListData} />
        </section>
      )
    }
  return renderTable();
}
