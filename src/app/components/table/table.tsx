import CardSm from '../card/cardSm'
import CardLg from '../card/cardLg'
import { Article } from '../../../../types';
import { forEach } from '../../utils/forEach';

type Props = {
    data : Article[]
  }
  

export default function Table({data}:Props){
    if(!data) return null;

    const renderContent = () => {
        return forEach({of: data, render: (article : Article) => {
                if(data.indexOf(article) % 4 === 0) {
                    return <CardLg key={article._id}  data={article} />
                }
                if(data.indexOf(article) % 4 === 1) {
                    return <CardLg key={article._id} data={article} />
                }
                if(data.indexOf(article) % 4 === 2) {
                    return <CardSm key={article._id} data={article} />
                }
                if(data.indexOf(article) % 4 === 3) {
                    return <CardSm key={article._id} data={article} />
                }
            }
        })
    }


    return (
        <div className=" h-auto flex flex-row flex-wrap justify-center items-center gap-4
                        md:flex md:flex-row md:flex-wrap md:justify-center md:gap-x-10 md:gap-y-6
                        lg:flex lg:flex-row lg:flex-wrap lg:justify-center lg:gap-2
                        2xl:flex 2xl:flex-row 2xl:flex-wrap 2xl:justify-center 2xl:gap-2

        ">
            {renderContent()}
        </div>
    )
}
