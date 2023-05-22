import { useReducer, useMemo, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import UserContext from './UserContext'
import initialUserState from './initialUserState'
import userReducer from '../../reducers/user/user.reducer'
import * as action from "../../reducers/user/user.actions";

export interface ChildrenProps {
	children: React.ReactNode
}

export default function UserProvider(props: ChildrenProps) {
	const [userState, dispatch] = useReducer(userReducer, initialUserState)
	const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()

	useEffect(() => {
		const registerLoginUser = async () => {
			const token = await getAccessTokenSilently()
			if (!isLoading && isAuthenticated && token) {
				action.registerLoginUserAction(dispatch, user, token)
			}
		}
		registerLoginUser()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated])

	const memoProvider = useMemo(
		() => ({
			...userState
		}), [userState]
	);

	return (
		<UserContext.Provider value={memoProvider}>
			{props.children}
		</UserContext.Provider>
	)
}