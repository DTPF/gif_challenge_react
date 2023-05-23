import * as GifTypes from './gif.types'

export default function gifReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case GifTypes.INIT_GIFS:
			return {
				...state,
				gifs: payload.gifs,
			}

		case GifTypes.POST_GIF:
			return {
				...state,
				gifs: [...state.gifs, payload.gif],
			}

		default:
			return state
	}
}