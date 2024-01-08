'use client'

import { useEffect, useState } from 'react'
import { getSortedArticlesData } from '@/libs/articles'
import Carrousel from '../../components/carrousel/carrousel';
import Error from '../../error/error';

export default function Hero() {
    const [carrouselData, setCarrouselData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = () => {
      setIsLoading(true);
      getSortedArticlesData()
          .then((res) => {
              res = res.slice(0,3);
              setCarrouselData(res);
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

    const renderCarrousel = () => {
      return (
        <section className="w-full relative flex justify-center items-center mt-20 mb-20">
          <Carrousel data={carrouselData} />
        </section>
      )
    }

    return renderCarrousel();
}
