import { useEffect, useState } from 'react'
import { getCategoriesApi } from 'api/category.api'
import { Link } from 'react-router-dom'
import TitleH1 from '../titleH1/TitleH1'
import { Card } from 'antd'
const { Meta } = Card

export default function Categories() {
	const [categories, setCategories] = useState([])
	useEffect(() => {
		let isMounted = true
		const getCategories = async () => {
			const response = await getCategoriesApi()
			if (response.status === 200) {
				setCategories(response.result)
			}
		}
		isMounted && getCategories()
		return () => { isMounted = false }
	}, [])
	return (
		<>
			<TitleH1 title='Categories' />
			<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 1400, margin: '0 auto' }}>
				{categories.map((category: any) => {
					return <RenderCategory key={category._id} category={category} />
				})}
			</div>
		</>
	)
}

function RenderCategory({ category }: any) {
	return (
		<Link to={`/categories/${category._id}`} className='gif-card-container'>
			<Card
				hoverable
				className='gif-card-container__card'
				cover={<img alt={category.name} src={category.imageUrl} width={220} height={'auto'} />}
			>
				<Meta title={category.name} style={{ padding: 10, textAlign: 'center' }} />
			</Card>
		</Link>
	)
}