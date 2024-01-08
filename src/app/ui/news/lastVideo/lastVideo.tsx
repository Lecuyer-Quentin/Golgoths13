'use client'

import { useEffect, useState } from 'react'
import { getSortedArticlesData } from '@/libs/articles'
import CarrouselSm from '../../components/carrousel/carrouselSm';
import Link from 'next/link';
import Error from '../../error/error';

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
                //res = res.slice(0, 5);
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

    if (isLoading) return <div>Loading...</div>
    if (error) return <Error error={error} reset={fetchData} />

    const renderLastVideo = () => {
      return (
        <section className="w-full py-10">
          <div className="flex items-center justify-between mx-4 mb-8">
            <h2 className="text-4xl font-bold">Last Video</h2>
            <Link href={URL}>
                View all
            </Link>
          </div>
          <CarrouselSm data={lastVideoData} />
        </section>
      )
    }

    return renderLastVideo();
}