import CardLoading from "@/app/components/card/card/loading"

const Loading = () => {
    return (
        <div className="w-full h-auto flex flex-col gap-6 justify-center items-center 
                            md:flex-row md:flex-wrap md:justify-center md:gap-x-20
                            xl:flex-row xl:flex-wrap xl:justify-center xl:gap-x-30">
            {Array.from({length: 3}, (_, i) => i).map((i) => {
                return (
                    <CardLoading key={i} />
                )
            }
            )}
            </div>
    )
}

export default Loading
