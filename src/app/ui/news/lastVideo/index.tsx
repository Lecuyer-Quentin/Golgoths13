'use client'

import CarrouselSm from '@/app/components/carrousel/carrouselSm';
import { Article } from '@../../../types';
import Error from '../../../utils/error/error';
import { useState, useEffect } from "react";
import { getSortedArticlesData } from '@/libs/articles';
import Loading from './loading';

type Props = {
 // data : Article[];
 // error : Error | null;
 // reset : () => void;
}

export default function LastVideo() {

    const [data, setData] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const getLastVideoData = async () => {
        try{
            const data = await getSortedArticlesData();
            const videosData = data.filter((article : Article) => {
                  return article.tags && article.tags.includes('#video');
            });
            return videosData
        } catch (error) {
            return error
        }
    }

    useEffect(() => {
        getLastVideoData()
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

    const renderLastVideo = () => {
      return (
          <CarrouselSm data={data} />
      )
    }

    if(!data) return null
    if(error) return <Error error={error} reset={getLastVideoData} />
    if(loading) return <Loading />

    return renderLastVideo();
}