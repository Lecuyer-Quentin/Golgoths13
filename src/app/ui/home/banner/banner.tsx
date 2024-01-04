'use client'

import Card from '../../components/card/card';
import { useEffect, useState } from 'react';

import { Article } from "../../../../../types";
import { getSortedArticlesData } from '@/libs/articles';


export default function Banner() {
 
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSortedArticlesData();
            setBannerData(data.slice(0,3));
        };
        fetchData();
    }, []);

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
