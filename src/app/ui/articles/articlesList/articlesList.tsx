
import Table from '../../../components/table/table';
import Error from '../../error/error';
import { Article } from '@/../../../../types';

type Props = {
  data: Article[]
  error: Error | null
  reset: () => void
}

export default function ArticlesList({ data, error, reset }: Props) {

  if (error) return <Error error={error} reset={reset} />

    const renderTable = () => {
      return (
            <Table data={data} />
      )
    }
  return renderTable();
}
