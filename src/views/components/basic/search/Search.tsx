import { useContext, useEffect, useState } from 'react'
import SearchContext from 'context/search/SearchContext';
import { searchGifsApi } from 'api/gif.api';
import TitleH1 from '../titleH1/TitleH1';
import RenderGifs from '../renderGifs/RenderGifs';
import { Empty } from 'antd';

export default function Search() {
	const [gifs, setGifs] = useState([])
	const { query } = useContext(SearchContext)

	useEffect(() => {
		let isMounted = true
		const searchFetch = async () => {
			const response = await searchGifsApi(query)
			if (response.status === 200) {
				setGifs(response.result)
			}
		}
		isMounted && query.length > 1 && searchFetch()
		return () => { isMounted = false }
	}, [query])

	return (
		<div style={{ maxWidth: 1600, margin: '0 auto' }}>
			{query && <TitleH1 title={`Results of ${query}`} />}
			{gifs.length === 0 ? (
				<Empty style={{ marginTop: 50 }} />
			) : (
				<RenderGifs gifs={gifs} />
			)}
		</div>
	)
}