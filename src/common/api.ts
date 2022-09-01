type BuildGetParamsProps<T extends object> = {
	[key in keyof T]?: string | number
}

export const buildGetParams = <T extends object>(params: BuildGetParamsProps<T>): string => {
	let result = '?'
	for (let key in params) {
		if (params[key]?.toString()) {
			result += `${key}=${params[key]}`
		}
	}
	
	return result
}