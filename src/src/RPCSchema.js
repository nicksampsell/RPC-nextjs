import * as yup from 'yup'

const requiredMessage = 'Required'


export const RPCSchema = yup.object({
	firstName: yup.string().required(requiredMessage),
	middleName: yup.string().nullable(),
	lastName: yup.string().required(requiredMessage),
	address: yup.string().required(requiredMessage),
	address2: yup.string().nullable(),
	city: yup.string().required(requiredMessage),
	state: yup.string().length(2,'Invalid Selection').required(requiredMessage),
	zipCode: yup.string().required(requiredMessage),
	email: yup.string().email('Invalid Email').required(requiredMessage),
	employeeNumber: yup.number().typeError('Invalid Format').required(requiredMessage),
	ssn: yup.string().required(requiredMessage),
	phone: yup.string().required(requiredMessage),
	position: yup.number().positive().integer().required(requiredMessage),
	schedule: yup.string().required(requiredMessage),
	grade: yup.string().required(requiredMessage),
	step: yup.string().required(requiredMessage),
	wages: yup.number().typeError('Invalid Format').required(requiredMessage),
	department: yup.number().typeError('Invalid Selection').required(requiredMessage),
	currentEmployee: yup.number().typeError('Invalid Selection').required(requiredMessage),
	position: yup.number().typeError('Invalid Selection').required(requiredMessage)

}).required();

export const fieldTypes = [
	'textarea',
	'tiptap',
	'file',
	'date',
	'datetime-local',
	'datespan',
	'datetimespan',
	'salary',
	'boolean',
	'radio',
	'toggle',
	'checkbox']