import { fetchIt } from "../../utils/Fetch"
import { Settings } from "../../utils/Settings"


export const getFiler = (id) => {
    return fetchIt(`${Settings.API}/filers/${id}`)
}

export const updateFiler = (id, filerObject) => {
    return fetchIt(`${Settings.API}/filers/${id}`, 'PUT', filerObject)
}

export const getFilers = (id) => {
    return fetchIt(`${Settings.API}/filers`)
}

export const deactivateFiler = (id) => {
    return fetchIt(`${Settings.API}/filers/${id}`, 'DELETE')
}
export const activateFiler = (id) => {
    return fetchIt(`${Settings.API}/filers/${id}/activate`, 'POST')
}