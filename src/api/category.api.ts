import { basePath } from "./utils/config"

export const getCategoriesNameApi = async (): Promise<any> => {
	const response = await fetch(`${basePath}/categories-name`)
	const data = await response.json()
	return data
}