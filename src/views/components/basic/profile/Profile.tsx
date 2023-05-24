import { useContext } from 'react'
import { DeleteOutlined, EditOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Card, Empty, Image, Popconfirm, message } from 'antd'
import MyGifsContext from 'context/mygifs/MyGifsContext'
import { Gif } from 'interfaces/gif'
import { useNavigate } from 'react-router-dom'
import { incrementSharedCountApi } from 'api/gif.api'
import TitleH1 from '../titleH1/TitleH1'
const { Meta } = Card

export default function Profile() {
	const { gifs } = useContext(MyGifsContext)
	return (
		<div style={{ maxWidth: 1600, margin: '0 auto' }}>
			<TitleH1 title={`My gif' s`} />
			<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
				{gifs.length === 0 ? (
					<Empty style={{ marginTop: 50 }} />
				) : (
					gifs.map((gif: Gif) => {
						return (
							<RenderGif key={gif._id} gif={gif} />
						)
					})
				)}
			</div>
		</div>
	)
}

function RenderGif({ gif }: any) {
	const [messageApi, contextHolder] = message.useMessage()
	const { deleteGif } = useContext(MyGifsContext)
	const navigate = useNavigate()
	const handleShare = async () => {
		await incrementSharedCountApi(gif._id)
		await navigator.clipboard.writeText(gif.imageUrl ? gif.imageUrl : gif.externalImageUrl);
		message.success('Copied to clipboard')
	}
	return (
		<div className='gif-card-container'>
			<Card
				hoverable
				className='gif-card-container__card'
				cover={<Image alt={gif.name} src={gif.imageUrl ? gif.imageUrl : gif.externalImageUrl} />}
			>
				<Meta style={{ paddingTop: 10, paddingBottom: 0, textAlign: 'center' }} title={gif.name} description={(
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<img src={gif.user?.avatar} width={30} height={30} style={{ borderRadius: '50%' }} alt='avatar' />
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
							<div style={{ padding: '0 5px', fontSize: '.8rem' }}>{gif.user.name}</div>
							<div>
								<Popconfirm
									placement="topRight"
									title={'Are you sure to delete this gif?'}
									description={'Delete the gif'}
									onConfirm={() => deleteGif(gif._id, messageApi)}
									okText="Yes"
									cancelText="No"
								>
									<DeleteOutlined style={{ fontSize: '1.1rem', color: 'red' }} />
								</Popconfirm>
								<EditOutlined style={{ fontSize: '1.1rem', paddingLeft: 7 }} onClick={() => navigate(`/gif-form/${gif._id}`)} />
								<ShareAltOutlined onClick={() => handleShare()} style={{ fontSize: '1.1rem', paddingLeft: 7 }} />
							</div>
						</div>
					</div>
				)} />
			</Card>
			{contextHolder}
		</div>
	)
}