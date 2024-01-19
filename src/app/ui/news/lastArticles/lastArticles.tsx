
import CarrouselSm from '@/app/components/carrousel/carrouselSm';
import { Article } from '@../../../types';
import Error from '../../error/error';

type Props = {
  data : Article[];
  error : Error | null;
  reset : () => void;
}

export default function LastArticles({ data, error, reset }: Props) {

    if (error) return <Error error={error} reset={reset} />

    const renderLastArticles = () => {
      return (
          <CarrouselSm data={data} />
      )
    }

    return renderLastArticles();


}