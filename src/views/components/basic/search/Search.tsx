import { useContext, useEffect, useState } from 'react'
import { searchGifsApi } from 'src/api/gif.api';
import RenderGifs from '../renderGifs/RenderGifs';
import { Empty } from 'antd';
import SearchContext from 'src/context/search/SearchContext';

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
		isMounted && query.length > 2 && searchFetch()
		return () => { isMounted = false }
	}, [query])

	return (
		<div style={{ maxWidth: 1600, margin: '0 auto' }}>
			{gifs.length === 0 ? (
				<Empty style={{ marginTop: '20%' }} />
			) : (
				<RenderGifs gifs={gifs} />
			)}
		</div>
	)
}