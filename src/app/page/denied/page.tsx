import Link from "next/link";

import React from 'react'

export default function DeniedPage() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen">
        <h1 className="text-4xl font-bold text-center">Access Denied</h1>
        <Link href="/">
            Go back home
        </Link>
    </section>
  )
}
