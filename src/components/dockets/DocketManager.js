import { fetchIt } from "../../utils/Fetch"
import { Settings } from "../../utils/Settings"

export const getDocket = (id) => {
    return fetchIt(`${Settings.API}/dockets/${id}`)
}

export const getDockets = () => {
    return fetchIt(`${Settings.API}/dockets`)
}