import { fetchIt } from "../../utils/Fetch"
import { Settings } from "../../utils/Settings"

export const getFirms = () => {
    return fetchIt(`${Settings.API}/firms`)
}

export const getRepFirms = (repId) => {
    return fetchIt(`${Settings.API}/repFirms`)
}

export const addRelation = (relationObject) => {
    return fetchIt(`${Settings.API}/firms/addRelation`, "PUT", relationObject)
}
export const removeRelation = (relationObject) => {
    return fetchIt(`${Settings.API}/firms/removeRelation`, "PUT", relationObject)
}