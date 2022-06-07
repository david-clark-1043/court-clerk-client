import { fetchIt } from "../../utils/Fetch"
import { Settings } from "../../utils/Settings"


export const getFiler = (id) => {
    return fetchIt(`${Settings.API}/filers/${id}`)
}

export const updateFiler = (id, filerObject) => {
    return fetchIt(`${Settings.API}/filers/${id}`, 'PUT', filerObject)
}

export const getFilers = () => {
    return fetchIt(`${Settings.API}/filers`)
}
export const getParties = () => {
    return fetchIt(`${Settings.API}/filers?type=party`)
}
export const getPartyTypes = () => {
    return fetchIt(`${Settings.API}/partyTypes`)
}

export const deactivateFiler = (id) => {
    return fetchIt(`${Settings.API}/filers/${id}`, 'DELETE')
}
export const activateFiler = (id) => {
    return fetchIt(`${Settings.API}/filers/${id}/activate`, 'POST')
}