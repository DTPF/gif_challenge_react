import * as api from 'api/gif.api';
import * as GifTypes from './myGifs.types'
import { message } from 'antd';

export async function initMyGifsAction(dispatch: any, userId: string, token: any) {
	try {
		const response = await api.getGifsByUserApi(userId, token)
		if (response.status === 200 || response.status === 201) {
			return dispatch({
				type: GifTypes.INIT_MY_GIFS,
				payload: {
					gifs: response.result
				}
			})
		} else {
			message.warning('Authentication failed')
		}
	} catch (err) {
		message.error('Server error')
	}
}

export async function postGifAction(dispatch: any, userId: string, gif: any, token: any, messageApi: any, addToGifState: any, navigate: any) {
	try {
		let newGif;
		if (gif.externalImage) {
			const postGif = await api.postGifApi(userId, { name: gif.name, categories: gif.categories, externalImageUrl: gif.externalImage }, token)
			newGif = postGif
		} else {
			const postGif = await api.postGifApi(userId, { name: gif.name, categories: gif.categories }, token)
			const postGifImage: any = await api.putGifImageApi(postGif.result._id, gif.image.file.originFileObj, token)
			newGif = postGifImage
		}
		if (newGif.status === 200) {
			messageApi.destroy()
			messageApi.success(`Gif '${newGif.result.name}' created`)
			addToGifState(newGif.result)
			dispatch({
				type: GifTypes.POST_GIF,
				payload: {
					gifs: newGif.result
				}
			})
			return navigate('/profile')
		} else {
			messageApi.destroy()
			messageApi.warning('Authentication failed')
		}
	} catch (err) {
		messageApi.destroy()
		messageApi.error('Server error')
	}
}

export async function updateGifAction(dispatch: any, gifId: string, gif: any, messageApi: any, token: any, myGifsState: any) {
	try {
		let gifUpdated;
		const values = {
			name: gif?.name,
			categories: gif?.categories
		}

		if (gif.image?.file.originFileObj) {
			const postGifImage = await api.putGifImageApi(gifId, gif.image.file.originFileObj, token)
			gifUpdated = postGifImage
		}
		if (gif?.name || gif?.categories) {
			const postGif = await api.updateGifApi(gifId, values, token)
			gifUpdated = postGif
		}

		if (gifUpdated.status === 200) {
			const findGifIndex = myGifsState.gifs.findIndex((item: any) => item._id === gifId)
			myGifsState.gifs[findGifIndex] = gifUpdated.result
			messageApi.destroy()
			messageApi.success(`Gif '${gifUpdated.result.name}' updated`)
			return dispatch({
				type: GifTypes.UPDATE_GIF,
				payload: myGifsState.gifs
			})
		} else {
			messageApi.destroy()
			messageApi.warning(gifUpdated.message)
		}

	} catch (err) {
		messageApi.destroy()
		messageApi.error('Server error')
	}
}

export async function deleteGifAction(dispatch: any, gifId: string, userId: string, myGifsState: any, messageApi: any, token: any) {
	try {
		const gifToDelete: any = await api.deleteGifByIdApi(gifId, userId, token)
		if (gifToDelete.status === 200) {
			const filteredGifs = myGifsState.gifs.filter((item: any) => item._id !== gifId)
			messageApi.destroy()
			messageApi.success(`Gif deleted`)
			return dispatch({
				type: GifTypes.DELETE_GIF,
				payload: filteredGifs
			})
		} else {
			messageApi.destroy()
			messageApi.warning(`Something went wrong`)
		}
	} catch (err) {
		messageApi.destroy()
		messageApi.error('Server error')
	}
}