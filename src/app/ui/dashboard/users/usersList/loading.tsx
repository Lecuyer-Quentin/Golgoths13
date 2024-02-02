import { Skeleton, Card } from '@nextui-org/react';

export default function Loading() {
  return (
    <div className="w-full h-auto relative px-5 flex flex-col gap-5 justify-center items-center">

      <Skeleton className="rounded-lg absolute top-10 left-5">
        <div className="w-[16rem] h-16 rounded-lg bg-default-300"></div>
      </Skeleton>

      <Skeleton className="rounded-lg absolute top-12 right-5">
        <div className="w-28 h-12 rounded-lg bg-default-300"></div>
      </Skeleton>

    <Card className="w-full h-[28rem] relative top-[8rem]" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="w-full h-[28rem] rounded-lg bg-default-300"></div>
      </Skeleton>
    </Card>

    <Skeleton className="rounded-lg mt-[8rem]">
        <div className="w-[16rem] h-[3rem] rounded-lg bg-default-300"></div>
    </Skeleton>

    </div>

  )
}
