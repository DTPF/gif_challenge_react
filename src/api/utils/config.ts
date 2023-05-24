import { isLocalhost } from "utils/isLocalhost";

export const basePath = isLocalhost ?
    `${window.location.protocol}//${window.location.hostname}:4000/api/v1` :
    `${window.location.origin}/api/v1`;