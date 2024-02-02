import { Skeleton, Card } from '@nextui-org/react';

export default function HeroLoading(){
  return (
    <Card className='w-full md:h-[36rem] h-screen'>
        <Skeleton className="rounded-lg">
                    <div className="w-full h-screen md:h-[36rem] rounded-lg bg-default-300">
                    
                    </div>
            </Skeleton>  
    </Card>
  )
}
