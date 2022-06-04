import { fetchIt } from "../../utils/Fetch"
import { Settings } from "../../utils/Settings"


export const createFiling = (filing) => {
    return fetchIt(`${Settings.API}/filings`, "POST", filing)
}

export const getFiling = (id) => {
    return fetchIt(`${Settings.API}/filings/${id}`)
}

export const getFilingTypes = () => {
    return fetchIt(`${Settings.API}/filingTypes`)
}