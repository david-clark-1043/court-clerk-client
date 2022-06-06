import { fetchIt } from "../../utils/Fetch"
import { Settings } from "../../utils/Settings"

export const getDocket = (id) => {
    return fetchIt(`${Settings.API}/dockets/${id}`)
}

export const getDockets = () => {
    return fetchIt(`${Settings.API}/dockets`)
}

export const getDocketsByFiler = (filerId) => {
    return fetchIt(`${Settings.API}/dockets?filer=${filerId}`)
}

export const getOpenDocketsByFiler = (filerId) => {
    return fetchIt(`${Settings.API}/dockets?filer=${filerId}&open=1`)
}