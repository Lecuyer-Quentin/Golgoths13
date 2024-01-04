import CardSm from '../card/cardSm'
import CardLg from '../card/cardLg'
import { Article } from '../../../../../types';

type Props = {
    data : Article[]
  }
  

export default function Table({data}:Props){
    return (
        <div className="w-auto h-auto grid grid-cols-1 justify-items-center mx-auto gap-2
                        md:grid md:grid-cols-2 md:w-[90%] md:gap-x-10
                        lg:flex lg:flex-row lg:flex-wrap lg:justify-center lg:w-[100%] lg:gap-2
        ">
            {data.map((item, index) => {
                if(index % 4 === 0) {
                    return <CardLg key={item._id}  data={item} />
                } else if (index % 4 === 1) {
                    return <CardLg key={item._id} data={item} />
                } else if (index % 4 === 2) {
                    return <CardSm key={item._id} data={item} />
                } else {
                    return <CardSm key={item._id} data={item} />
                }
            })}
        </div>
    )
}

