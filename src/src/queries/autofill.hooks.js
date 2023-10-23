import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import axios from 'axios'
import { useFormContext} from 'react-hook-form'


export const useGetOrganizations = () =>
	useQuery(['getAllOrganizations'],
	async () => {
		const { data } = await axios.get('/Api/RPCAPI/GetUserOrganizations',
		{
			withCredentials: true,
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		})
		return data
	}
)

export const useGetDepartments = (organizationId) =>
	useQuery({
	queryKey:['getAllDepartments',organizationId],
	queryFn: async () => {
		const { data } = await axios.get('/Api/RPCAPI/GetUserDepartments/' + organizationId,
		{
			withCredentials: true,
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		})
		return data
	},
	enabled: !!organizationId
})

export const useGetRPCActions = () =>
useQuery(
	['getAllRPCCategories'],
	async () => {
		const { data } = await axios.get('/Api/RPCAPI/GetRPCActions',
		{
			withCredentials: true,
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		})
		return data
	}
)

export const useGetPreviousEmployee = (inputtedValue) => {
let positionId;

if(typeof inputtedValue === 'object')
{
	positionId = inputtedValue?.value;
}
else if(Array.isArray(inputtedValue))
{
	positionId = inputtedValue?.[0]?.value;
}
else
{
	positionId = inputtedValue
}

return useQuery({
	queryKey: ['getFormerEmployee', inputtedValue],
	queryFn: async () => {
		const { data } = await axios.get('/Api/PositionApi/GetPreviousEmployees/' + positionId,
		{
			withCredentials: true,
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		})
		return data
	},
	enabled: !!inputtedValue
})
}

export const useGetEmployeesAndPositions = (departmentId, includeAllDepartments) => 

useQuery({
	queryKey: ['getEmployeesAndPositions', departmentId, includeAllDepartments],
	queryFn: async() => {
		const { data } = await axios.get('/Api/RPCAPI/GetPositionsAndEmployeesByDepartment/' + departmentId + '/' + !!includeAllDepartments,
		{
			withCredentials: true,
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		})
		return data
	},
	enabled: !!departmentId
})

export const useLoadRPCById = (rpcId) => 

useQuery({
	queryKey: ['getRPCById', rpcId],
	queryFn: async() => {
		const { data } = await axios.get('/Api/RPCAPI/GetById/' + rpcId,
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

export const useLoadEmployeeBySSN = (ssn, rpcType) => 

useQuery({
	queryKey: ['getEmployeeBySSN', ssn],
	queryFn: async() => {
		const { data } = await axios.get('/Api/employeeapi/GetBySSN/' + ssn,
		{
			withCredentials: true,
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		})
		return data
	},
	enabled: !!ssn && rpcType == 'newEmployee' && ssn.length >= 9 && ssn != '___-__-____'
})

export const useGetFileUploads = (rpcId) => 

useQuery({
	queryKey: ['getFileUploads', rpcId],
	queryFn: async() => {
		const { data } = await axios.get('/Api/file/GetUploads/' + rpcId,
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

