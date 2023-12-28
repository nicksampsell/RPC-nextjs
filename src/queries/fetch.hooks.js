'use client'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useFormContext} from 'react-hook-form'
import axios from 'axios'

axios.defaults.baseURL = 'https://localhost:7080'
axios.defaults.withCredentials = true;

export const useGetOrganizations = () =>
	useQuery({
	queryKey: ['getAllOrganizations'],
	queryFn: async () => {
		const { data } = await axios.get('/Api/organization/search',
		{
			withCredentials: true,
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		})
		return data
	}
})

export const useGetDepartments = (organizationId) =>
	useQuery({
	queryKey:['getAllDepartments',organizationId],
	queryFn: async () => {
		const { data } = await axios.get('/api/department/search?organizationId=' + organizationId,
		{
			withCredentials: true,
			headers: {
				
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
		const { data } = await axios.get('/Api/GetPreviousEmployees/' + positionId,
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


export const useGetPositions = (organizationId, departmentId) => 

useQuery({
	queryKey: ['getPositions', organizationId, departmentId],
	queryFn: async() => {
		const { data } = await axios.get('/api/position/search?organizationId=' + organizationId + '&departmentId=' + departmentId,
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

export const useGetEmployeesAndPositions = (departmentId, includeAllDepartments, includeFormerEmployees) => 

useQuery({
	queryKey: ['getEmployeesAndPositions', departmentId, includeAllDepartments, includeFormerEmployees],
	queryFn: async() => {
		const { data } = await axios.get('/Api/RPCAPI/GetPositionsAndEmployeesByDepartment/' + departmentId + '/' + !!includeAllDepartments + '/' + !!includeFormerEmployees,
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

