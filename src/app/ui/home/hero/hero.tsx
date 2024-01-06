'use client'

import { useEffect, useState } from 'react'
import { getSortedArticlesData } from '@/libs/articles'
import Carrousel from '../../components/carrousel/carrousel';

export default function Hero() {
    const [carrouselData, setCarrouselData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getSortedArticlesData()
            .then((res) => {
                res = res.slice(0, 3);
                setCarrouselData(res);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            })
    }, []);

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error...</div>

    const renderCarrousel = () => {
      return (
        <section className="w-full relative flex justify-center items-center mt-20 mb-20">
          <Carrousel data={carrouselData} />
        </section>
      )
    }

    return renderCarrousel();
}
