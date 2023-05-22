import { Gif } from "src/interfaces/gif"
import makeRequest from 'src/api/utils/makeRequest'
type GifResponse = {
	status: number,
	result: Gif
}

export const getGifsApi = async (): Promise<GifResponse> => {
	return makeRequest('gif', null, true, 'GET')
}