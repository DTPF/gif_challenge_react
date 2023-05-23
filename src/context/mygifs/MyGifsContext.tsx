import { createContext } from "react";
import initialMyGifsState from "./initialMyGifsState";
const MyGifsContext = createContext(initialMyGifsState)

export default MyGifsContext