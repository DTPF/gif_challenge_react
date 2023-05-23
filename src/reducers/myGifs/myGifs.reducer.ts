import * as MyGifsTypes from './myGifs.types'

export default function myGifsReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case MyGifsTypes.INIT_MY_GIFS:
			return {
				...state,
				gifs: payload.gifs,
			}

		case MyGifsTypes.POST_GIF:
			return {
				...state,
				gifs: [...state.gifs, payload.gifs],
			}

		case MyGifsTypes.UPDATE_GIF:
			return {
				...state,
				gifs: payload,
			}

		case MyGifsTypes.DELETE_GIF:
			return {
				...state,
				gifs: payload
			}

		default:
			return state
	}
}