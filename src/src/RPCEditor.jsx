import { useState, useContext } from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import { ReactQueryDevtools } from 'react-query/devtools'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import Form from './form'
import { RPCDataSetContext } from './RPCDataSetContext'
import { Notes } from './components/Notes'


const queryClient = new QueryClient({})

export default (props) => {

  const { register, control, handleSubmit } = useForm()
  const dataset = useContext(RPCDataSetContext)


  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <RPCDataSetContext.Provider value={{...props}}>
      	<Form {...props} />
      </RPCDataSetContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}