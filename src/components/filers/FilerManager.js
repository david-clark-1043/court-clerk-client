import { fetchIt } from "../../utils/Fetch"
import { Settings } from "../../utils/Settings"


export const getFiler = (id) => {
    return fetchIt(`${Settings.API}/filers/${id}`)
}