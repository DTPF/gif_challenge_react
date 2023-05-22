import { getGifsApi } from 'src/api/gif.api';
import * as UserTypes from './gif.types'
import { message } from 'antd';

export async function initGifsAction(dispatch: any) {
	try {
		const response = await getGifsApi()
		if (response.status === 200 || response.status === 201) {
			return dispatch({
				type: UserTypes.INIT_GIFS,
				payload: {
					dbUser: response.result
				}
			})
		} else {
			message.warning('Authentication failed')
		}
	} catch (err) {
		message.error('Server error')
	}
}