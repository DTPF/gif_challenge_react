import { message } from 'antd';
import { registerLoginUserAPI } from '../../api/user.api';
import * as UserTypes from './user.types'

export async function registerLoginUserAction(dispatch: any, user: any, token: any) {
	try {
		const response = await registerLoginUserAPI({ user }, token)
		if (response.status === 200 || response.status === 201) {
			return dispatch({
				type: UserTypes.REGISTER_LOGIN_USER,
				payload: {
					auth0User: user,
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