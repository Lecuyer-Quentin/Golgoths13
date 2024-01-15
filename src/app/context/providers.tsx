'use client'

import AuthProvider from './AuthProvider'
import NextUIProvider from './NextProvider'

export function Providers({
  children,
}:{
  children: React.ReactNode,
 }) {
  
  return (
    <AuthProvider>
      <NextUIProvider>
          {children}
      </NextUIProvider>
    </AuthProvider>
  )
}