'use client'

import { useEffect, useState } from 'react'
import { getSortedArticlesData } from '@/libs/articles'
import Table from '../../components/table/table';

export default function LastNews() {

    const [lastNewsData, setLastNewsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSortedArticlesData();
            setLastNewsData(data.slice(0,5));
        }
        fetchData();
    }
    , []);

  return (
    <section>
        <Table data={lastNewsData} />
    </section>
  )
}
