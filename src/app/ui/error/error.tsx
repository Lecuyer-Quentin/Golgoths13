'use client' // Error components must be Client Components

import { Button } from '@nextui-org/react'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void | Promise<void>
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center">
      <h2>Something went wrong!</h2>
      <Button onClick={() => reset()}>
        Try again
      </Button>
    </div>
  )
}