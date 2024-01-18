'use client'

import { useEffect, useMemo, useState } from 'react'
import { getSortedArticlesData } from '@/libs/articles'
import Carrousel from '@/app/components/carrousel/carrousel';
import Error from '@/app/ui/error/error';
import Loading from '@/app/ui/loading/loading';
import { useCallback, useRef } from 'react';

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

  //const fetchDataMemo = useMemo(() => fetchData, []);

  useEffect(() => {
      fetchData();
  }, []);


    if (isLoading) return <Loading numberOfItems={3}  />
    if (error) return <Error error={error} reset={fetchData} />

    // todo : cause error in prod if no data
    const renderCarrousel = () => {
      return (
          <Carrousel data={carrouselData} />
      )
    }

    return renderCarrousel();
}
