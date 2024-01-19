
import Card from '@/app/components/card/card';
import { Article } from "@../../../types";
import Error from '@/app/ui/error/error';
import { forEach } from '@/app/utils/forEach';

type Props = {
    data: Article[];
    error : Error | null;
    reset : () => void;
    }



export default function Banner({ data, error, reset }: Props) {

    if (error) return <Error error={error} reset={reset} />

    const renderCards = () => {
        return (
            forEach({of: data, render: (article : Article) => {
                return <Card key={article._id} data={article} />
            }
        })
        )
    }

    const renderContent = () => {
        return (
            <div className="w-full h-auto grid grid-cols-1 gap-6 justify-items-center mt-20 mb-20
                            md:grid-cols-2 md:gap-x-40
                            xl:grid-cols-3 xl:gap-x-20">
                {renderCards()}
            </div>
        )
    }
  return renderContent();
  
}
