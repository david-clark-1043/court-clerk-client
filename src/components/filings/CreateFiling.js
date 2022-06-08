import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getDockets } from "../dockets/DocketManager"
import { createFiling, getFilingTypes } from "./FilingManager"

export const CreateFiling = () => {
    const [filing, SetFiling] = useState({
        docketId: 0,
        title: "",
        fileUrl: "",
        filingTypeId: 0,
        filePdf: "",
    })
    const [newCase, SetNewCase] = useState(true)
    /* 
        filing object should have format for api:
        filingTypeId
        fileUrl
        docketId - if 0 creates new docket
    */

    const [filingTypes, SetFilingTypes] = useState([])
    const [dockets, SetDockets] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            const typesAsync = getFilingTypes()
                .then(SetFilingTypes)
            const docketsAsync = getDockets()
                .then(SetDockets)
            Promise.all([typesAsync, docketsAsync])
        }, []
    )




    const handleForm = (event) => {
        const copy = JSON.parse(JSON.stringify(filing))
        if (event.target.name !== "fileUrl" && event.target.name !== "title") {
            copy[event.target.name] = parseInt(event.target.value)
        } else {
            copy[event.target.name] = event.target.value
        }
        SetFiling(copy)
    }

    const submitFiling = () => {
        createFiling(filing)
            .then(newFiling => {
                if ("docket" in newFiling) {
                    history.push(`/dockets/${newFiling.docket.id}`)
                } else {
                    window.alert("Only judges can file orders")
                }
            })
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createPdfFileString = (event) => {
        getBase64(event.target.files[0], (base64PdfString) => {
            console.log("Base64 of file is", base64PdfString);
    
            // Update a component state variable to the value of base64ImageString
            const copy = JSON.parse(JSON.stringify(filing))
            copy[event.target.name] = base64PdfString
            SetFiling(copy)
        });
    }

    return <div>
        <h1>Submit New Filing</h1>
        <div>
            <label htmlFor="newCase">New Case? Y/N</label>
            <input type="checkbox" onChange={(e) => {
                let copy = JSON.parse(JSON.stringify(filing))
                copy.docketId = 0
                SetFiling(copy)
                if (e.target.checked) {
                    SetNewCase(true)
                } else {
                    SetNewCase(false)
                }
            }} checked={newCase} />
            {
                newCase
                    ? null
                    : <>
                        <label htmlFor="docketId">Select Docket: </label>
                        <select name="docketId"
                            onChange={handleForm}
                            value={filing.docketId}
                        >
                            <option value="0">Start New Case</option>
                            {
                                dockets.map(docket => {
                                    return <option key={`docket-${docket.id}`} value={docket.id}>{docket.caseName} {docket.caseNum}</option>
                                })
                            }
                        </select>
                    </>
            }
        </div>
        <div>
            <label htmlFor="title">Title: </label>
            <input type="text" name="title" onChange={handleForm} value={filing.title} />
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
                        return <option key={`filingType-${filingType.id}`} value={filingType.id}>{filingType.filingType}</option>
                    })
                }
            </select>
        </div>
        <input type="file" name="filePdf" id="filePdf" onChange={createPdfFileString} />
        {/* <input type="hidden" name="filePdf" value={game.id} /> */}
        {/* <button onClick={() => {
            // Upload the stringified image that is stored in state
        }}>Upload</button> */}
        <button onClick={submitFiling}>
            Submit Filing
        </button>

    </div>
}