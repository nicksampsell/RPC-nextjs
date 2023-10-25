'use client'
import { create } from 'zustand'
import { produce } from 'immer'

type KeyValuePair = {
    Key: number | string;
    Value: number | string | KeyValuePair | Array<any>
};

type Store = {
    allOrganizations: Array<KeyValuePair> | Array<Object> | null,
    allDepartments: Array<KeyValuePair> | Array<Object> | null,
    currentOrganization: Array<KeyValuePair> | Object | null,
    currentDepartment: Array<KeyValuePair> | Object | null,
    allPositions: Array<KeyValuePair> | Array<Object> | null,
    allEmployees: Array<KeyValuePair> | Array<Object> | null,
    currentPoisition: Array<KeyValuePair> | Object | null,
    oldPosition: Array<KeyValuePair> | Object | null,
    currentEmployee: Array<KeyValuePair> | Object | null,
    currentEmployeeOriginalInformation: Array<KeyValuePair> | Object | null,
    bulkEmployees: Array<KeyValuePair> | null,
    RPCActionCategory: number | string | null,
    RPCAction: number | string | null,
    RPCData: Array<KeyValuePair> | null,
    RPCDataFields: Array<KeyValuePair> | null,
    RPCFormId: string | null,
    RPCId: number | string | null
};

type Action = {
    setOrganizations: any,
    setAllDepartments: any,
    setAllPositions: any,
    setAllEmployees: any,
    setCurrentOrganization: any,
    setCurrentDepartment: any,
    setCurrentEmployee: any,
    setCurrentPosition: any,
    setBulkEmployees: any,
    setRPCActionCategory: any,
    setRPCAction: any,
    setRPCData: any,
    setRPCFormId: any,
    setRPCId: any,
    setRPCDataFields: any,
    updateSingleField: any,
    updateEmployeeInfo: any,
    clearRPCData: any,
    clearForm: any
};

export const useStore = create<Store & Action>((set) => ({
    allOrganizations: null,
    allDepartments: null,
    currentOrganization: null,
    currentDepartment: null,
    allPositions: null,
    allEmployees: null,
    currentPoisition: null,
    oldPosition: null,
    currentEmployee: null,
    currentEmployeeOriginalInformation: null,
    bulkEmployees: null,
    RPCActionCategory: null,
    RPCAction: null,
    RPCData: null,
    RPCDataFields: null,
    RPCFormId: null,
    RPCId: null,


    setOrganizations: (organizations: Array<KeyValuePair> | Array<object>) => set(produce((state) =>  state.allOrganizations = organizations )),
    setAllDepartments: (departments: Array<KeyValuePair> | Array<object>) => set(produce((state) =>  state.allDepartments = departments )),
    setAllPositions: (positions: Array<KeyValuePair> | Array<object>) => set(produce((state) =>  state.allPositions = positions )),
    setAllEmployees: (employees: Array<KeyValuePair> | Array<object>) => set(produce((state) => state.allEmployees = employees )),
    setCurrentOrganization: (organization: Array<KeyValuePair> | object) => set(produce((state) => state.currentOrganization = organization )),
    setCurrentDepartment: (department: Array<KeyValuePair> | object) => set(produce((state) => state.currentDepartment = department )),
    setCurrentEmployee: (employee: Array<KeyValuePair> | object) => set(produce((state) => { 
                                                    state.currentEmployee = employee, 
                                                    state.currentEmployeeOriginalInformation = employee 
                                                })),
    setCurrentPosition: (position: Array<KeyValuePair> | object) => set(produce((state) => {
                                                    state.currentPosition = position 
                                                    state.oldPosition = position
                                                })),
    setBulkEmployees: (employees: Array<KeyValuePair>) => set(produce((state) => state.bulkEmployees = employees )),
    setRPCActionCategory: (category: string | number) => set(produce((state) => state.RPCActionCategory = category )),
    setRPCAction: (action: string | number) => set(produce((state) => state.RPCActionCategory = action )),
    setRPCData: (fieldId : string | number, value : string | number) => set(produce((state) =>  state[fieldId] = value )),
    setRPCFormId: (formId: string | number) => set(produce((state) =>  state.RPCFormId = formId )),
    setRPCId: (rpcId: string | number) => set(produce((state) =>  state.RPCId = rpcId )),
    setRPCDataFields: (fields: Array<KeyValuePair>) => set(produce((state) => state.RPCDataFields = fields )),
    updateSingleField: (objectId: string, keyName: string, value: any) => set(produce((state) => {
        if(state[objectId]?.hasOwnProperty(keyName))
        {
            state[objectId][keyName] = value
        }
        else
        {
            state[objectId] = { ...state[objectId], [keyName]: value }
        }
    })),
    updateEmployeeInfo: (field: string | number, value: string | number) => set(produce((state) =>  state.currentEmployee[field] = value )),
    updatePosition: (position: Array<KeyValuePair> | object) => set(produce((state) => state.currentPoisition = position )),
    clearRPCData: () => set(produce((state) => state.RPCData = null )),
    clearForm: () => set(produce((state) => {
            state.allOrganizations = null
            state.allDepartments = null
            state.currentOrganization = null
            state.currentDepartment = null
            state.allPositions = null
            state.allEmployees = null
            state.currentPoisition = null
            state.oldPosition = null
            state.currentEmployee = null
            state.currentEmployeeOriginalInformation = null
            state.bulkEmployees = null
            state.RPCActionCategory = null
            state.RPCAction = null
            state.RPCData = null
            state.RPCDataFields = null
            state.RPCFormId = null
            state.RPCId = null
    })) 
}));