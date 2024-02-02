import CardLgLoading from "@/app/components/card/cardLg/loading"
import CardSmLoading from "@/app/components/card/cardSm/loading"

const Loading = () => {
    return (
        <div className=" h-auto flex flex-row flex-wrap justify-center items-center gap-4
                        md:flex md:flex-row md:flex-wrap md:justify-center md:gap-x-10 md:gap-y-6
                        lg:flex lg:flex-row lg:flex-wrap lg:justify-center lg:gap-2
                        2xl:flex 2xl:flex-row 2xl:flex-wrap 2xl:justify-center 2xl:gap-2

        ">
            {Array.from({length: 15}).map((_, index) => {
                if(index % 4 === 0) {
                    return <CardLgLoading key={index} />
                }
                if(index % 4 === 1) {
                    return <CardLgLoading key={index} />
                }
                if(index % 4 === 2) {
                    return <CardSmLoading key={index} />
                }
                if(index % 4 === 3) {
                    return <CardSmLoading key={index} />
                }
            }
            )}
        </div>
    )
}

export default Loading