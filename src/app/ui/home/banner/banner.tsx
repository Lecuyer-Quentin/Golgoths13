'use client'

import Card from '../../components/card/card';
import { useEffect, useState } from 'react';
import { Article } from "../../../../../types";
import { getSortedArticlesData } from '@/libs/articles';


export default function Banner() {
    const [bannerData, setBannerData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
    }, []);

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error...</div>
    
    const renderContent = () => {
        return bannerData.map((article : Article) => {
            return <Card key={article._id} data={article} />
        })
    }

  return (
    <section
        className="w-[90%] h-auto grid grid-cols-1 gap-6 justify-items-center mt-20 mb-20
                    md:grid-cols-2 md:gap-x-40
                    xl:grid-cols-3 xl:gap-x-20"
    >
      {renderContent()}
    </section>
  )
}
