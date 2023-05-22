import { createContext } from "react";
import initialGifState from "./initialGifState";
const GifContext = createContext(initialGifState)

export default GifContext