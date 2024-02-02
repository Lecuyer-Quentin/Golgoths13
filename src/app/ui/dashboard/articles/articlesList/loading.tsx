import ArticleItemLoading from "../articleItem/loading";



export default function Loading() {
    return (
        <div className="w-full h-auto flex flex-col gap-6 justify-center items-center 
                            md:flex-row md:flex-wrap md:justify-center md:gap-x-20
                            xl:flex-row xl:flex-wrap xl:justify-center xl:gap-x-30">
            {Array.from({length: 5}, (_, i) => i).map((i) => {
                return (
                    <ArticleItemLoading key={i} />
                )
            }
            )}
            </div>
    )
}