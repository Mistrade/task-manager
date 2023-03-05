export type ObjectId = string
export type UtcDate = string
export type ErrorTypes = 'info' | 'success' | 'warning' | 'error' | 'default'

interface ServerErrorType {
	message: string,
	type: ErrorTypes
}

export interface CustomRtkError {
	data: MyServerResponse,
	status: number
}

export interface MyServerResponse<T = null> {
	data?: T | null,
	info?: ServerErrorType
}