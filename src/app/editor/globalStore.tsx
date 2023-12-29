'use client'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type KeyValuePair = {
    Key: number | string;
    Value: number | string | KeyValuePair | Array<any>
};

type Store = {
    allOrganizations: Array<KeyValuePair> | null,
    allDepartments: Array<KeyValuePair> | null,
    currentOrganization: KeyValuePair | null,
    currentDepartment: KeyValuePair | null,
    currentPositionSchedule: KeyValuePair | null,
    allPositions: Array<KeyValuePair> | null,
    allEmployees: Array<KeyValuePair> | null,
    currentPosition: KeyValuePair | null,
    oldPosition: KeyValuePair | null,
    currentEmployee: KeyValuePair | null,
    currentEmployeeOriginalInformation: KeyValuePair | null,
    bulkEmployees: Array<KeyValuePair> | null,
    RPCActionCategory: number | string | null,
    RPCAction: number | string | null,
    RPCData: Array<KeyValuePair> | null,
    RPCDataFields: Array<KeyValuePair> | null,
    RPCFormId: string | number | null,
    RPCId: number | string | null,
    step: string | null,
    wage: number | null,
};

type Action = {
    setAllOrganizations: (organizations: Array<KeyValuePair> | null) => void,
    setAllDepartments: (departments: Array<KeyValuePair> | null) => void,
    setAllPositions: (positions: Array<KeyValuePair> | null) => void,
    setAllEmployees: (employees: Array<KeyValuePair> | null) => void,
    setCurrentOrganization: (organization: KeyValuePair | null) => void,
    setCurrentPositionSchedule: (schedule: KeyValuePair | null) => void,
    setCurrentDepartment: (department: KeyValuePair | null) => void,
    setCurrentEmployee: (employee: KeyValuePair | null) => void,
    setCurrentPosition: (position: KeyValuePair | null) => void,
    setBulkEmployees: (employees: Array<KeyValuePair> | null) => void,
    setStep: (step: string) => void,
    setWage: (wage : number) => void,
    setRPCActionCategory: (category: string | number | null) => void,
    setRPCAction: (action: string | number | null) => void,
    setRPCData: (fieldId: string | number, value: string | number) => void,
    setRPCFormId: (formId: string | number | null) => void,
    setRPCId: (rpcId: string | number | null) => void,
    setRPCDataFields: (fields: Array<KeyValuePair> | null) => void,
    updateSingleField: (objectId: string, keyName: string, value: any) => void,
    updateEmployeeInfo: (field: string | number, value: string | number) => void,
    updatePosition: (position: KeyValuePair | null) => void,
    clearRPCData: () => void,
    clearForm: () => void
};

export const useStore = create<Store & Action>(
    immer((set) => ({
        allOrganizations: null,
        allDepartments: null,
        currentOrganization: null,
        currentDepartment: null,
        currentPositionSchedule: null,
        allPositions: null,
        allEmployees: null,
        currentPosition: null,
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
        step: null,
        wage: null,

        setAllOrganizations: (organizations) => set((state) => {
            state.allOrganizations = organizations;
        }),
        setAllDepartments: (departments) => set((state) => {
            state.allDepartments = departments;
        }),
        setAllPositions: (positions) => set((state) => {
            state.allPositions = positions;
        }),
        setAllEmployees: (employees) => set((state) => {
            state.allEmployees = employees;
        }),
        setCurrentOrganization: (organization) => set((state) => {
            state.currentOrganization = organization;
        }),
        setCurrentPositionSchedule: (schedule) => set((state) => {
            state.currentPositionSchedule = schedule;
        }),
        setCurrentDepartment: (department) => set((state) => {
            state.currentDepartment = department;
        }),
        setCurrentEmployee: (employee) => set((state) => {
            state.currentEmployee = employee;
            state.currentEmployeeOriginalInformation = employee;
        }),
        setCurrentPosition: (position) => set((state) => {
            state.currentPosition = position;
            state.oldPosition = position;
        }),
        setBulkEmployees: (employees) => set((state) => {
            state.bulkEmployees = employees;
        }),
        setRPCActionCategory: (category) => set((state) => {
            state.RPCActionCategory = category;
        }),
        setRPCAction: (action) => set((state) => {
            state.RPCAction = action;
        }),
        setRPCData: (fieldId, value) => set((state) => {
            state.RPCData[fieldId] = value;
        }),
        setRPCFormId: (formId) => set((state) => {
            state.RPCFormId = formId;
        }),
        setRPCId: (rpcId) => set((state) => {
            state.RPCId = rpcId;
        }),
        setRPCDataFields: (fields) => set((state) => {
            state.RPCDataFields = fields;
        }),

        setStep: (step) => set((state) => {
            state.step = step;
        }),

        setWage: (wage) => set((state) => {
            state.wage = wage;
        }),

        updateSingleField: (objectId, keyName, value) => set((state) => {
            if (state[objectId]?.hasOwnProperty(keyName)) {
                state[objectId][keyName] = value;
            } else {
                state[objectId] = { ...state[objectId], [keyName]: value };
            }
        }),
        updateEmployeeInfo: (field, value) => set((state) => {
            state.currentEmployee[field] = value;
        }),
        updatePosition: (position) => set((state) => {
            state.currentPosition = position;
        }),
        clearRPCData: () => set((state) => {
            state.RPCData = null;
        }),
        clearForm: () => set((state) => {
            state.allOrganizations = null;
            state.allDepartments = null;
            state.currentOrganization = null;
            state.currentDepartment = null;
            state.currentPositionSchedule = null;
            state.allPositions = null;
            state.allEmployees = null;
            state.currentPosition = null;
            state.oldPosition = null;
            state.currentEmployee = null;
            state.currentEmployeeOriginalInformation = null;
            state.bulkEmployees = null;
            state.RPCActionCategory = null;
            state.RPCAction = null;
            state.RPCData = null;
            state.RPCDataFields = null;
            state.RPCFormId = null;
            state.RPCId = null;
            state.step = null;
            state.wage = null;
        })
    }))
);