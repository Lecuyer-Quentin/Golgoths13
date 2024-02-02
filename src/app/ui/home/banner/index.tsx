'use client'

import Card from '@/app/components/card/card';
import { Article } from "@../../../types";
import Error from '@/app/utils/error/error';
import { useEffect, useState } from 'react';
import { getSortedArticlesData } from '@/libs/articles';
import Loading from './loading';

type Props = {
    //data: Article[];
    //error : Error | null;
    //reset : () => void;
    }

export default function Banner() {

    const [data, setData] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);


    const getBannerData = async () => {
        try{
            const data = await getSortedArticlesData();
            const bannerData = data.slice(0,3);
            return bannerData
        } catch (error) {
            return error
        }
    }
    useEffect(() => {
        getBannerData()
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

    const renderCard = (article: Article) => {
        return (
            <Card key={article._id} data={article} />
        )
    }
    const renderCards = () => {
        return (
            <>
                {data && data.map((article) => {
                    return (
                        renderCard(article)
                    )
                })}
            </>
        )
    }
    const renderContent = () => {
        return (
            <div className="w-full h-auto flex flex-col gap-6 justify-center items-center 
                            md:flex-row md:flex-wrap md:justify-center md:gap-x-20
                            xl:flex-row xl:flex-wrap xl:justify-center xl:gap-x-30">
                {renderCards()}
            </div>
        )
    }


    if(!data) return null
    if (error) return <Error error={error} reset={getBannerData} />
    if (loading) return <Loading />

  return renderContent()
  
}
