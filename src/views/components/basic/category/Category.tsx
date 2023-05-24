import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import RenderGifs from '../renderGifs/RenderGifs';
import { getGifsByCategoryApi } from 'src/api/gif.api';
import TitleH1 from '../titleH1/TitleH1';

export default function Category() {
	const { categoryId } = useParams()
	const [result, setGifs] = useState({
		gifs: [],
		categoryName: ''
	})

	useEffect(() => {
		let isMounted = true
		const getCategory = async () => {
			if (categoryId) {
				const response = await getGifsByCategoryApi(categoryId.toString())
				if (response.status === 200) {
					setGifs(response.result)
				}
			}
		}
		isMounted && getCategory()
		return () => { isMounted = false }
	}, [categoryId])

	return (
		<div>
			<TitleH1 title={result.categoryName} />
			<RenderGifs gifs={result.gifs} />
		</div>
	)
}