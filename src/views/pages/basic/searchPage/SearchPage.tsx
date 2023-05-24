import { useContext } from 'react'
import SearchContext from 'context/search/SearchContext'
import Search from 'views/components/basic/search'
import HelmetSEO from 'views/utils/HelmetSEO/HelmetSEO'

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