import CardSm from '../card/cardSm'
import CardLg from '../card/cardLg'
import { Article } from '../../../../../types';

type Props = {
    data : Article[]
  }
  

export default function Table({data}:Props){
    return (
        <div className=" h-auto grid grid-cols-1 justify-items-center mx-auto gap-2
                        md:grid md:grid-cols-2 md:w-[90%]
                        lg:flex lg:flex-row lg:flex-wrap lg:justify-center lg:gap-2
                        xl:flex xl:flex-row xl:flex-wrap xl:justify-center xl:w-[70rem] xl:gap-2
                        2xl:flex 2xl:flex-row 2xl:flex-wrap 2xl:justify-center 2xl:w-[90rem] 2xl:gap-2
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

