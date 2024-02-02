import { Skeleton, Card } from '@nextui-org/react';


const CardLoading = () => {
    return (
        <Card className="w-[22rem] h-[32rem]" radius="lg">
            <Skeleton className="rounded-lg">
                    <div className="h-[20rem] rounded-lg bg-default-300"></div>
            </Skeleton>

            <div className="h-[12rem] relative">

                <Skeleton className="absolute top-5 left-6 rounded-lg">
                    <div className="h-[3rem] w-[8rem] bg-default-200"></div>
                </Skeleton>

                <Skeleton className="absolute bottom-10 right-10 rounded-lg">
                    <div className="h-[2rem] w-[4rem] bg-default-200"></div>
                </Skeleton>

            </div>
          
        </Card>
    )
}

export default CardLoading