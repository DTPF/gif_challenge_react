import { useReducer, useMemo, useEffect, useCallback } from 'react'
import GifContext from './GifContext'
import initialGifState from './initialGifState'
import gifReducer from '../../reducers/gif/gif.reducer'
import * as action from "../../reducers/gif/gif.actions";
import { ChildrenProps } from 'src/interfaces/global';
import { Gif } from 'src/interfaces/gif';

export default function GifProvider(props: ChildrenProps) {
	const [gifState, dispatch] = useReducer(gifReducer, initialGifState)

	useEffect(() => {
		const initGifs = async () => {
			action.initGifsAction(dispatch)
		}
		initGifs()
	}, [])

	const postGif = useCallback(async (gif: Gif) => {
		action.postGifAction(dispatch, gif)
	},
		[])

	const memoProvider = useMemo(
		() => ({
			...gifState,
			postGif,
		}), [
		gifState,
		postGif,
	]);

	return (
		<GifContext.Provider value={memoProvider}>
			{props.children}
		</GifContext.Provider>
	)
}