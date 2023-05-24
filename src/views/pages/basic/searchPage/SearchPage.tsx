import { useContext } from 'react'
import SearchContext from 'src/context/search/SearchContext'
import Search from 'src/views/components/basic/search'
import HelmetSEO from 'src/views/utils/HelmetSEO/HelmetSEO'

export default function SearchPage() {
	const { query } = useContext(SearchContext)
	return (
		<HelmetSEO
			title={`Search: ${query}`}
			description='DaGif Home Page'
		>
			<Search />
		</HelmetSEO>
	)
}