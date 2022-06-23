import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getDockets } from "../dockets/DocketManager"
import { createFiling, getFilingTypes } from "./FilingManager"
import { getRepFirms } from "../firms/FirmManager"
import { getFiler, getFilers, getPartyTypes } from "../filers/FilerManager"

import "./CreateFiling.css"

export const CreateFiling = () => {
    const [filing, SetFiling] = useState({
        docketId: 0,
        partyTypeId: 0,
        title: "",
        filingTypeId: 0,
        filePdf: "",
        repFirmId: 0,
        partyId: 0,
        proSeStatus: true // true = pro se; false = attorney representing someone
    })
    const [newCase, SetNewCase] = useState(true)
    /* 
        filing object should have format for api:
        filingTypeId
        fileUrl
        docketId - if 0 creates new docket
    */
    const [repFirms, setRepFirms] = useState([])
    const [filingTypes, SetFilingTypes] = useState([])
    const [dockets, SetDockets] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [isAttorney, setIsAttorney] = useState(false)
    const [parties, setParties] = useState([])
    const [partyTypes, setPartyTypes] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            const typesAsync = getFilingTypes()
                .then(SetFilingTypes)
            const docketsAsync = getDockets()
                .then(SetDockets)
            const firmsAsync = getRepFirms()
                .then(setRepFirms)
            const userAsync = getFiler(parseInt(localStorage.getItem("filerId")))
                .then(setCurrentUser)
            const filersAsync = getFilers().then(setParties)
            const partyTypesAsync = getPartyTypes().then(setPartyTypes)
            Promise.all([
                typesAsync, docketsAsync,
                firmsAsync, userAsync, filersAsync,
                partyTypesAsync
            ])
        }, []
    )

    useEffect(
        () => {
            if ("filerType" in currentUser) {
                setIsAttorney(currentUser.filerType.filerType === "attorney")
            }
        }, [currentUser]
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
            {
                newCase
                    ? <div style={{ display: "flex" }}>
                        <div>
                            Filing a New Case
                        </div>
                        <button
                            onClick={e => {
                                let copy = JSON.parse(JSON.stringify(filing))
                                copy.docketId = 0
                                SetFiling(copy)
                                SetNewCase(false)
                            }}>
                            Switch to Exisiting Case
                        </button>
                    </div>
                    : <>
                        <label htmlFor="docketId">Select Docket: </label>
                        <select name="docketId"
                            onChange={handleForm}
                            value={filing.docketId}
                        >
                            <option value="0" hidden>Select Case</option>
                            {
                                dockets.map(docket => {
                                    return <option key={`docket-${docket.id}`} value={docket.id}>{docket.caseName} {docket.caseNum}</option>
                                })
                            }
                        </select>
                        <button
                            onClick={e => {
                                let copy = JSON.parse(JSON.stringify(filing))
                                copy.docketId = 0
                                SetFiling(copy)
                                SetNewCase(true)
                            }}>
                            Switch to New Case
                        </button>
                    </>
            }
        </div>
        <div>
            <label htmlFor="title">Filing Title: </label>
            <input type="text" name="title" onChange={handleForm} value={filing.title} />
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
        <div>
            <select
                name="partyTypeId"
                onChange={handleForm}
                value={filing.partyTypeId}
            >
                <option value="0">Select Primary Party Type</option>
                {
                    partyTypes.map(partyType => {
                        return <option key={`partyType-${partyType.id}`} value={partyType.id}>{partyType.partyType}</option>
                    })
                }
            </select>
        </div>
        <div>
            {
                isAttorney
                ? filing.proSeStatus
                    ? <div>
                        <div>Filing pro se</div>
                        <button
                            onClick={e => {
                                let copy = JSON.parse(JSON.stringify(filing))
                                copy.proSeStatus = false
                                SetFiling(copy)
                            }}>
                            File Representing a Party
                        </button>
                    </div>
                    : <div>
                        <div>
                            <button
                                onClick={e => {
                                    let copy = JSON.parse(JSON.stringify(filing))
                                    copy.proSeStatus = true
                                    copy.partyId = 0
                                    copy.repFirmId = 0
                                    SetFiling(copy)
                                }}>
                            File Pro Se Instead
                            </button>
                        </div>
                    <div>Filing For:</div>
                    <select name="partyId"
                            onChange={handleForm}
                            value={filing.partyId}
                        >
                            <option value="0" hidden>Select Party to Represent</option>
                        {
                            parties?.map(party => {
                                if(party.id != currentUser.id) {
                                    return <option key={`party-${party.id}`} value={party.id}>{party.user.firstName} {party.user.lastName}</option>
                                }
                            })
                        }
                    </select>
                    <div>Filing For:</div>
                    <div>
                        <select name="repFirmId"
                            onChange={handleForm}
                            value={filing.repFirmId}
                        >
                            <option value="0" hidden>Select Firm Relation</option>
                            {
                                repFirms.map(repFirm => {
                                    return <option key={`repFirm-${repFirm.id}`} value={repFirm.id}>{repFirm.firm.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                : null
            }
        </div>



        <button onClick={submitFiling}>
            Submit Filing
        </button>

    </div>
}