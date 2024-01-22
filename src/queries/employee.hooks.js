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

export const useGetEmployeeBySSN = (ssn) =>
	useQuery({
	queryKey:['getEmployeeBySSN',ssn],
	queryFn: async () => {
		const { data } = await axios({
			method: 'post',
			url: '/api/Employee/findBySSN',
			withCredentials: true,
			data: {
				ssn: ssn.replace("-","")
			},
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		})
		return data
	},
	enabled: !!ssn && ssn.length >= 9
})

export const useGetEmployeesByDepartment = (organizationId, departmentId, includeAllEmployees, includeFormerEmployees) =>
	useQuery({
	queryKey:['getEmployeesByDepartment',organizationId, departmentId, includeAllEmployees, includeFormerEmployees],
	queryFn: async () => {

		

		const { data } = await axios({
			method: 'get',
			url: '/api/Employee/FindByDepartment/'+ organizationId + '/' + departmentId,
			params: {
				allEmployees: includeAllEmployees,
				formerEmployees: includeFormerEmployees
			},
			withCredentials: true,
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		})
		return data
	},
	enabled: !!organizationId && !!departmentId
})



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