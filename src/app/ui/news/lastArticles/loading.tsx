import CardSmLoading from "@/app/components/card/cardSm/loading"


const Loading = () => {
    return (
        <div className=" flex flex-row items-center justify-evenly h-auto overflow-hidden

        ">
            {Array.from({length: 5}).map((_, index) => {
               return <CardSmLoading key={index} />
            }
            )}
        </div>
    )
}

export default Loading