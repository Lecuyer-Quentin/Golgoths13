
import CarrouselSm from '@/app/components/carrousel/carrouselSm';
import { Article } from '@../../../types';
import Error from '../../error/error';

type Props = {
  data : Article[];
  error : Error | null;
  reset : () => void;
}

export default function LastVideo({ data, error, reset }: Props) {

    if (error) return <Error error={error} reset={reset} />

    const renderLastVideo = () => {
      return (
          <CarrouselSm data={data} />
      )
    }
    return renderLastVideo();
}