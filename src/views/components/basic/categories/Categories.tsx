import { useEffect, useState } from 'react'
import { getCategoriesApi } from 'src/api/category.api'
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
			<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 1200, margin: '0 auto' }}>
				{categories.map((category: any) => {
					return <RenderCategory key={category._id} category={category} />
				})}
			</div>
		</>
	)
}

function RenderCategory({ category }: any) {
	return (
		<Link to={`/categories/${category._id}`} style={{ display: 'flex', margin: 15 }}>
			<Card
				hoverable
				style={{ width: 240 }}
				cover={<img alt={category.name} src={category.imageUrl} width={240} height={240} />}
			>
				<Meta style={{ padding: 10, textAlign: 'center' }} title={category.name} />
			</Card>
		</Link>
	)
}