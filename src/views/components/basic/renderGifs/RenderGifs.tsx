import { incrementSharedCountApi } from "api/gif.api"
import { Gif } from "interfaces/gif"
import { ShareAltOutlined } from "@ant-design/icons"
import { Card, Image, message } from "antd"
const { Meta } = Card

export default function RenderGifs({ gifs }: any) {
	return (
		<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
			{gifs.map((gif: Gif) => {
				return (
					<RenderGif key={gif._id} gif={gif} />
				)
			})}
		</div>
	)
}

function RenderGif({ gif }: any) {
	const handleShare = async () => {
		await incrementSharedCountApi(gif._id)
		await navigator.clipboard.writeText(gif.imageUrl ? gif.imageUrl : gif.externalImageUrl)
		message.success('Copied to clipboard')
	}
	return (
		<div className='gif-card-container'>
			<Card
				hoverable
				className='gif-card-container__card'
				cover={<Image alt={gif.name} src={gif.imageUrl ? gif.imageUrl : gif.externalImageUrl} />}
			>
				<Meta style={{ padding: 0, textAlign: 'center' }} title={gif.name} description={(
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<img src={gif.user?.avatar} width={30} height={30} style={{ borderRadius: '50%' }} />
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
							<div style={{ padding: '0 5px', fontSize: '.8rem' }}>{gif.user?.name}</div>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<span style={{ fontSize: '.9rem' }}>{gif.timesShared && gif.timesShared}</span><ShareAltOutlined style={{ fontSize: '1.2rem' }} onClick={() => handleShare()} />
							</div>
						</div>
					</div>
				)} />
			</Card>
		</div>
	)
}