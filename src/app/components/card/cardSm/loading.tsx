import { Skeleton, Card } from '@nextui-org/react';


const CardSmLoading = () => {
    return (
        <Card className="w-[18rem] h-[22rem]" radius="lg">
            <Skeleton className="rounded-lg">
                    <div className="h-[22rem] rounded-lg bg-default-300">
                    
                    </div>
            </Skeleton>          
        </Card>
    )
}

export default CardSmLoading
