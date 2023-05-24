import { getGifsApi } from 'api/gif.api';
import * as GifTypes from './gif.types'
import { message } from 'antd';
import { Gif } from 'interfaces/gif';

export async function initGifsAction(dispatch: any) {
	try {
		const response = await getGifsApi()
		if (response.status === 200 || response.status === 201) {
			return dispatch({
				type: GifTypes.INIT_GIFS,
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

export async function postGifAction(dispatch: any, gif: Gif) {
	return dispatch({
		type: GifTypes.POST_GIF,
		payload: { gif }
	})
}