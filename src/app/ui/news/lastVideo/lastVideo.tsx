'use client'

import { useEffect, useState } from 'react'
import { getSortedArticlesData } from '@/libs/articles'
import CarrouselSm from '@/app/components/carrousel/carrouselSm';
import Link from 'next/link';
import Error from '@/app/ui/error/error';
import Loading from '@/app/ui/loading/loading';
import { Article } from '@../../../types';

export default function LastVideo() {
    const [lastVideoData, setLastVideoData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const URL = `/page/videos`

    //todo - change this to get only videos
    const fetchData = () => {
        setIsLoading(true);
        getSortedArticlesData()
            .then((res) => {
                //res = res.filter((article : Article) => {
                //    return article.tags && article.tags.includes('#video');
                //});
                res = res.slice(0, 5);
                setLastVideoData(res);
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

    const renderLastVideo = () => {
      return (
          <CarrouselSm data={lastVideoData} />
      )
    }
    return renderLastVideo();
}