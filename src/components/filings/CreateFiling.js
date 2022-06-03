import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { createFiling, getFilingTypes } from "./FilingManager"

export const CreateFiling = () => {
    const [filing, SetFiling] = useState({
        docketId: 0,
        fileUrl: "",
        filingTypeId: 0
    })
    /* 
        filing object should have format for api:
        filingTypeId
        fileUrl
        docketId - if 0 creates new docket
    */
                                
    const [filingTypes, SetFilingTypes] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            getFilingTypes()
                .then(SetFilingTypes)
        }, []
    )


    const handleForm = (event) => {
        const copy = JSON.parse(JSON.stringify(filing))
        if(event.target.name !== "fileUrl") {
            copy[event.target.name] = parseInt(event.target.value)
        } else {
            copy[event.target.name] = event.target.value
        }
        SetFiling(copy)
    }

    const submitFiling = () => {
        createFiling(filing)
            .then(newFiling => {
                history.push(`/dockets/${newFiling.docket.id}`)
            })
    }
    return <div>
        <h1>Submit New Filing</h1>
        <div>
            <label htmlFor="docketId">Select Docket: </label>
            <select name="docketId"
                onChange={handleForm}
                value={filing.docketId}
                >
                <option value="0">Start New Case</option>
                <option value="1">Case 1</option>
            </select>
        </div>
        <div>
            <label htmlFor="fileUrl">URL to File: </label>
            <input type="text" name="fileUrl" onChange={handleForm} value={filing.fileUrl} />
        </div>
        <div>
        <select name="filingTypeId"
                onChange={handleForm}
                value={filing.filingTypeId}
                >
                <option value="0" hidden>Select Filing Type</option>
                {
                    filingTypes.map(filingType => {
                        return <option value={filingType.id}>{filingType.filingType}</option>
                    })
                }
            </select>
        </div>
        <button onClick={submitFiling}>
            Submit Filing
        </button>

    </div>
}