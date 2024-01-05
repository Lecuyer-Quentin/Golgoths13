'use client'

import { useEffect, useState } from 'react'
import { getSortedArticlesData } from '@/libs/articles'
import Table from '../../components/table/table';

export default function ArticlesList() {

    const [articlesListData, setArticlesListData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSortedArticlesData();
            setArticlesListData(data);
        }
        fetchData();
    }
    , []);

  return (
    <section>
        <Table data={articlesListData} />
    </section>
  )
}
