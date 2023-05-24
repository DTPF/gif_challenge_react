import AllGifs from '../allGifs/AllGifs';
import TitleH1 from '../titleH1/TitleH1';

export default function HomeBasic() {
	return (
		<div style={{ maxWidth: 1600, margin: '0 auto' }}>
			<TitleH1 title={`All the gif' s`} />
			<AllGifs />
		</div>
	)
}