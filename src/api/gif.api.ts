import { Gif } from "interfaces/gif"
import makeRequest from 'api/utils/makeRequest'
import { basePath } from "./utils/config";
type GifResponse = {
	status: number,
	result: Gif
}

export const postGifApi = async (userId: string, gif: any, token: any): Promise<GifResponse> => {
	const params = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(gif),
	}
	const response = await fetch(`${basePath}/gif/${userId}`, params)
	const data = await response.json()
	return data
}

export const updateGifApi = async (gifId: string, gif: any, token: any): Promise<GifResponse> => {
	const params = {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(gif),
	}
	const response = await fetch(`${basePath}/gif/${gifId}`, params)
	const data = await response.json()
	return data
}

export const incrementSharedCountApi = async (gifId: string): Promise<GifResponse> => {
	const params = {
		method: "PUT",
	}
	const response = await fetch(`${basePath}/increment-shared-count/${gifId}`, params)
	const data = await response.json()
	return data
}

export const getGifsApi = async (): Promise<any> => {
	const response = await fetch(`${basePath}/gif`)
	const data = await response.json()
	return data
}

export const getGifsByUserApi = async (userId: string, token: any): Promise<GifResponse> => {
	const params = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
	const response = await fetch(`${basePath}/gifs-by-user/${userId}`, params)
	const data = await response.json()
	return data
}

export const putGifImageApi = async (gifId: string, image: any, token: any): Promise<any> => {
	const url = `gif-image/${gifId}`;
	const formData = new FormData();
	formData.append("image", image);
	return makeRequest(url, true, true, "PUT", token, formData, '');
}

export const deleteGifByIdApi = async (gifId: string, userId: string, token: any): Promise<GifResponse> => {
	const params = {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	}
	const response = await fetch(`${basePath}/gif/${gifId}/${userId}`, params)
	const result = await response.json()
	return result
}

export const getGifsByCategoryApi = async (categoryId: string): Promise<any> => {
	const response = await fetch(`${basePath}/gifs-by-category/${categoryId}`)
	const data = await response.json()
	return data
}

export const searchGifsApi = async (query: string): Promise<any> => {
	const response = await fetch(`${basePath}/search-gifs/${query}`)
	const data = await response.json()
	return data
}