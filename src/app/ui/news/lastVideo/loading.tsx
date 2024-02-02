import CardSmLoading from "@/app/components/card/cardSm/loading"

const Loading = () => {
    return (
        <div className=" flex 

        ">
            {Array.from({length: 5}).map((_, index) => {
               return <CardSmLoading key={index} />
            }
            )}
        </div>
    )
}

export default Loading