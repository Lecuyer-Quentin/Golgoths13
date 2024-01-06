'use client'

import { useEffect, useState } from 'react'
import { getSortedArticlesData } from '@/libs/articles'
import CarrouselSm from '../../components/carrousel/carrouselSm';
import Link from 'next/link';

export default function LastVideo() {
    const [lastVideoData, setLastVideoData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //todo - change this to get only videos
    useEffect(() => {
        getSortedArticlesData()
            .then((res) => {
                res = res.slice(0, 7);
                setLastVideoData(res);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            })
    }, []);

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error...</div>

    const renderLastVideo = () => {
      return (
        <section className="w-full py-8 border border-gray-200 ">
          <div className="flex items-center justify-between mx-4 mb-10">
            <h2 className="text-4xl font-bold">Last Video</h2>
            <Link href="/videos">
                View all
            </Link>
          </div>
          <CarrouselSm data={lastVideoData} />
        </section>
      )
    }

    return renderLastVideo();
}