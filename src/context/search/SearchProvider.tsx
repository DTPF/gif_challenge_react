import { useCallback, useState } from 'react'
import SearchContext from './SearchContext'

export interface ChildrenProps {
	children: React.ReactNode
}

export default function SearchProvider(props: ChildrenProps) {
	const [query, setQuery] = useState('')

	const setQueryAction = useCallback((input: string) => {
		setQuery(input)
	}, [setQuery])

	return (
		<SearchContext.Provider value={{ query, setQueryAction }}>
			{props.children}
		</SearchContext.Provider>
	)
}