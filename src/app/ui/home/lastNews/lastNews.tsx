
import Table from '../../../components/table/table';
import { Article } from '../../../../../types';
import Error from '@/app/ui/error/error';

type Props = {
  data: Article[];
  error : Error | null;
  reset : () => void;
}


export default function LastNews({ data, error, reset }: Props) {
  
    if(error) return <Error error={error} reset={reset} />

    const renderLastNews = () => {
      return (
          <Table data={data} />
      )
    }

    return renderLastNews(); 
}
