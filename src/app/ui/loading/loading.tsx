import React from 'react'
import { Skeleton, Card } from '@nextui-org/react'

type Props = {
    numberOfItems: number
    }

export default function Loading({numberOfItems}: Props) {

    const renderLoading = () => {
        return (
            <Card className="w-[200px] space-y-5 p-4" radius="lg">
            <Skeleton  className="rounded-lg">
              <div className="h-24 rounded-lg bg-secondary"></div>
            </Skeleton>
            <div className="space-y-3">
              <Skeleton  className="w-3/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-secondary"></div>
              </Skeleton>
              <Skeleton  className="w-4/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
              </Skeleton>
              <Skeleton  className="w-2/5 rounded-lg">
                <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
              </Skeleton>
            </div>
          </Card>
        )
    }
  return (
    <div className="flex flex-wrap justify-center space-x-4">
    {Array.from(Array(numberOfItems).keys()).map((index) => (
      <div key={index}>
        {renderLoading()}
      </div>
    ))}
    </div>
   
  )
}
