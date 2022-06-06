import { fetchIt } from "../../utils/Fetch"
import { Settings } from "../../utils/Settings"

export const assignManager = (docketId, managerObject) => {
    // Manager object only needs {managerId: int}
    return fetchIt(`${Settings.API}/dockets/${docketId}/assignManager`, 'PUT', managerObject)
}

export const getAllAdmins = () => {
    return fetchIt(`${Settings.API}/filers/admins`)
}

export const closeDocket = (docketId) => {
    return fetchIt(`${Settings.API}/dockets/${docketId}/close`, 'PUT')
}
export const promoteAdmin = (userId) => {
    return fetchIt(`${Settings.API}/filers/${userId}/promoteAdmin`, 'PUT')
}
export const demoteAdmin = (userId) => {
    return fetchIt(`${Settings.API}/filers/${userId}/demoteAdmin`, 'PUT')
}