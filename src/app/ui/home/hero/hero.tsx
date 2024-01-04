'use client'

import { useEffect, useState } from 'react'
import { getSortedArticlesData } from '@/libs/articles'
import Carrousel from '../../components/carrousel/carrousel';

export default function Hero() {

    const [carrouselData, setCarrouselData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSortedArticlesData();
            setCarrouselData(data.slice(0,3));
        };
        fetchData();
    }, []);

  return (
    <section className="w-full relative flex justify-center items-center border-1 border-white">
        <Carrousel data={carrouselData} />
    </section>
  )
}
