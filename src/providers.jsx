'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import axios from 'axios'



export default function Providers({children}) {
    const [queryClient] = React.useState(() => new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools></ReactQueryDevtools>
        </QueryClientProvider>
    )
}