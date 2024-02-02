import { Skeleton, Card } from '@nextui-org/react';


export default function ArticleItemLoading() {
    return (
        <Card className="w-full h-[4rem]" radius="lg">
            <Skeleton className="rounded-lg">
                    <div className="w-full h-[4rem] rounded-lg bg-default-300"></div>
            </Skeleton>

            

          
        </Card>
    )
}