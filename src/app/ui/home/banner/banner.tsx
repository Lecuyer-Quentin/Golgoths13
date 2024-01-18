'use client'

import Card from '@/app/components/card/card';
import { Suspense, useEffect, useState } from 'react';
import { Article } from "@../../../types";
import { getSortedArticlesData } from '@/libs/articles';
import Error from '@/app/ui/error/error';
import { forEach } from '@/app/utils/forEach';
import Loading from '../../loading/loading';


export default function Banner() {
    const [bannerData, setBannerData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchData = () => {
        setIsLoading(true);
        getSortedArticlesData()
            .then((res) => {
                res = res.slice(0, 3);
                setBannerData(res);
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

    if (isLoading) return <Loading numberOfItems={3}  />
    if (error) return <Error error={error} reset={fetchData} />

    const renderCards = () => {
        return (
            forEach({of: bannerData, render: (article : Article) => {
                return <Card key={article._id} data={article} />
            }
        })
        )
    }

    const renderContent = () => {
        return (
            <div className="w-full h-auto grid grid-cols-1 gap-6 justify-items-center mt-20 mb-20
                            md:grid-cols-2 md:gap-x-40
                            xl:grid-cols-3 xl:gap-x-20">
                {renderCards()}
            </div>
        )
    }
  return renderContent();
  
}
