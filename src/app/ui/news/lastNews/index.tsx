'use client'

import { useState, useEffect } from "react";
import Table from '../../../components/table/table';
import { Article } from '../../../../../types';
import Error from '@/app/utils/error/error';
import { getSortedArticlesData } from '@/libs/articles';
import Loading from "./loading";

type Props = {
  //data: Article[];
  //error : Error | null;
  //reset : () => void;
}


export default function LastNews() {

    const [data, setData] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const getLastNewsData = async () => {
        try{
            const data = await getSortedArticlesData();
            const lastNewsData = data.slice(0,5);
            return lastNewsData
        } catch (error) {
            return error
        }
    }

    useEffect(() => {
        getLastNewsData()
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

    const renderLastNews = () => {
      return (
          <Table data={data} />
      )
    }

    if(!data) return null
    if(error) return <Error error={error} reset={getLastNewsData} />
    if(loading) return <Loading />

    return renderLastNews(); 
}
