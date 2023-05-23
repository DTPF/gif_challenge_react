import { useContext } from 'react'
import { DeleteOutlined, EditOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Card, Empty, Image, Popconfirm, message } from 'antd'
import MyGifsContext from 'src/context/mygifs/MyGifsContext'
import { Gif } from 'src/interfaces/gif'
import { useNavigate } from 'react-router-dom'
import { incrementSharedCountApi } from 'src/api/gif.api'
const { Meta } = Card

export default function Profile() {
	const { gifs } = useContext(MyGifsContext)
	return (
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
		<div style={{ display: 'flex', margin: 15 }}>
			<Card
				hoverable
				style={{ width: 240 }}
				cover={<Image alt={gif.name} src={gif.imageUrl ? gif.imageUrl : gif.externalImageUrl} />}
			>
				<Meta style={{ padding: 0, textAlign: 'center' }} title={gif.name} description={(
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<img src={gif.user?.avatar} width={25} height={25} style={{ borderRadius: '50%' }} />
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
							<div style={{ padding: '0 5px', fontSize: '.7rem' }}>{gif.user.name}</div>
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