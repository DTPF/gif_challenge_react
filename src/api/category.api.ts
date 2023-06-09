import { basePath } from "./utils/config"

export const getCategoriesNameApi = async (): Promise<any> => {
	const response = await fetch(`${basePath}/categories-name`)
	const data = await response.json()
	return data
}

export const getCategoriesApi = async (): Promise<any> => {
	const response = await fetch(`${basePath}/categories`)
	const data = await response.json()
	return data
}

export const getCategoryNameApi = async (categoryId: string): Promise<any> => {
	const response = await fetch(`${basePath}/category-name/${categoryId}`)
	const data = await response.json()
	return data
}