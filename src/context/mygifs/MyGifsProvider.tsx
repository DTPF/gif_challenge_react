/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useMemo, useEffect, useCallback, useContext } from 'react'
import MyGifsContext from './MyGifsContext'
import UserContext from '../user/UserContext'
import initialMyGifsState from './initialMyGifsState'
import myGifsReducer from '../../reducers/myGifs/myGifs.reducer'
import * as action from "../../reducers/myGifs/myGifs.actions"
import { ChildrenProps } from 'src/interfaces/global'
import { useAuth0 } from '@auth0/auth0-react'
import { Gif } from 'src/interfaces/gif'
import GifContext from '../gif/GifContext'

export default function MyGifsProvider(props: ChildrenProps) {
	const [myGifsState, dispatch] = useReducer(myGifsReducer, initialMyGifsState)
	const { postGif: addToGifState } = useContext(GifContext)
	const { getAccessTokenSilently } = useAuth0()
	const { dbUser } = useContext(UserContext)

	useEffect(() => {
		const initGifs = async () => {
			const token = await getAccessTokenSilently()
			if (dbUser._id && token)
				action.initMyGifsAction(dispatch, dbUser._id, token)
		}
		initGifs()
	}, [dbUser._id])

	const postGif = useCallback(async (gif: Gif, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Creating gif`, duration: 0 })
		const token = await getAccessTokenSilently()
		if (dbUser._id && token) {
			action.postGifAction(dispatch, dbUser._id, gif, token, messageApi, addToGifState)
		}
	},
		[dbUser._id])

	const updateGif = useCallback(async (gifId: string, gif: Gif, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Updating gif`, duration: 0 })
		const token = await getAccessTokenSilently()
		if (gif && gifId && token)
			action.updateGifAction(dispatch, gifId, gif, messageApi, token, myGifsState)
	},
		[myGifsState, getAccessTokenSilently])

	const deleteGif = useCallback(async (gifId: any, messageApi: any) => {
		messageApi.open({ type: 'loading', content: `Removing gif`, duration: 0 })
		const token = await getAccessTokenSilently()
		if (token && gifId) {
			await action.deleteGifAction(dispatch, gifId, dbUser._id, myGifsState, messageApi, token)
		}
	}, [dbUser._id, myGifsState])

	const memoProvider = useMemo(
		() => ({
			...myGifsState,
			postGif,
			updateGif,
			deleteGif
		}), [
		myGifsState,
		postGif,
		updateGif,
		deleteGif
	]
	)

	return (
		<MyGifsContext.Provider value={memoProvider}>
			{props.children}
		</MyGifsContext.Provider>
	)
}