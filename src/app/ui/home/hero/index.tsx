'use client'

import Carrousel from '@/app/components/carrousel/carrousel';
import Error from '@/app/utils/error/error';
import { Article } from '../../../../../types';
import { useState, useEffect } from "react";
import { getSortedArticlesData } from '@/libs/articles';
import Loading from './loading'

type Props = {
 //data: Article[];
 //error : Error | null;
 //reset : () => void;
}

export default function Hero() {

  const [data, setData ] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const getHeroData = async () => {
    try{
      const data = await getSortedArticlesData()
      const heroData = data.slice(0,3);
      return heroData
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    getHeroData()
    .then((data) =>{
      setData(data)
    })
    .catch((error) => {
      setError(error as Error)
    })
    .finally(() => {
      setLoading(false)
    })
  }
  , [ error])

    const renderCarrousel = () => {
      return (
          <Carrousel data={data} />
      )
    }

    if(!data) return null
    if(error) return <Error error={error} reset={getHeroData} />
    if(loading) return <Loading />

    return renderCarrousel();
}
