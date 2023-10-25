import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import axios from 'axios'
import { useFormContext} from 'react-hook-form'

export const useDeleteFileUploads = (data) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data) => {
			return axios({
				url:'/Api/file',
				method: 'delete',
				data: data,
				withCredentials: true,
				headers: {
					'X-Requested-With': 'XMLHttpRequest'
				}
			})
		}
	})
}

export const useCreateRPCMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data) => {
			return axios({
				url:'/Api/RPCApi/CreateRPC',
				method: 'post',
				data: data,
				withCredentials: true,
				headers: {
					'X-Requested-With': 'XMLHttpRequest'
				}
			})
		}
	})
}

export const useUpdateRPCMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data) => {
			return axios({
				url:'/Api/RPCApi/UpdateRPC/' + data.rpcId,
				method: 'post',
				data: data.payload,
				withCredentials: true,
				headers: {
					'X-Requested-With': 'XMLHttpRequest'
				}
			})
		}
	})
}


export const useGetRPCNotes = (rpcId) => 
useQuery({
	queryKey: ['getRPCNotes', rpcId],
	queryFn: async() => {
		const { data } = await axios.get('/Api/RPCAPI/GetNotes/' + rpcId,
		{
			withCredentials: true,
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		})
		return data
	},
	enabled: !!rpcId
})


export const useCreateRPCNoteMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data) => {
			return axios({
				url:'/Api/RPCApi/PostNote/' + data.rpcId,
				method: 'post',
				data: data.payload,
				withCredentials: true,
				headers: {
					'X-Requested-With': 'XMLHttpRequest'
				}
			})
		}
	})
}

export const useDeleteRPCNoteMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data) => {
			return axios({
				url:'/Api/RPCApi/DeleteNote/' + data.rpcId,
				method: 'post',
				data: data.payload,
				withCredentials: true,
				headers: {
					'X-Requested-With': 'XMLHttpRequest'
				}
			})
		}
	})
}

