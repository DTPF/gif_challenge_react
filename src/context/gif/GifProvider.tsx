import { useReducer, useMemo, useEffect } from 'react'
import GifContext from './GifContext'
import initialGifState from './initialGifState'
import gifReducer from '../../reducers/gif/gif.reducer'
import * as action from "../../reducers/gif/gif.actions";
import { ChildrenProps } from 'src/interfaces/global';

export default function GifProvider(props: ChildrenProps) {
	const [gifState, dispatch] = useReducer(gifReducer, initialGifState)

	useEffect(() => {
		const initGifs = async () => {
			action.initGifsAction(dispatch)
		}
		initGifs()
	}, [])

	const memoProvider = useMemo(
		() => ({
			...gifState
		}), [
		gifState
	]
	);

	return (
		<GifContext.Provider value={memoProvider}>
			{props.children}
		</GifContext.Provider>
	)
}