import { useContext } from 'react'
import GifContext from 'context/gif/GifContext'
import RenderGifs from '../renderGifs/RenderGifs'

export default function AllGifs() {
	const { gifs } = useContext(GifContext)
	return <RenderGifs gifs={gifs} />
}