import { createContext } from "react"
import initialSearchState from "./initialSearchState"
const SearchContext = createContext(initialSearchState)

export default SearchContext