
import Carrousel from '@/app/components/carrousel/carrousel';
import Error from '@/app/ui/error/error';
import { Article } from '../../../../../types';

type Props = {
  data: Article[];
  error : Error | null;
  reset : () => void;
}

export default function Hero({ data, error, reset }: Props) {
    
  if (error) return <Error error={error} reset={reset} />

    // todo : cause error in prod if no data
    const renderCarrousel = () => {
      return (
          <Carrousel data={data} />
      )
    }

    return renderCarrousel();
}
