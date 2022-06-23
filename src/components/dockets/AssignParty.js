import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { assignParty } from "../adminTools/AdminManager"
import { getParties, getFilers, getPartyTypes } from "../filers/FilerManager"
import { getFirms } from "../firms/FirmManager"

export const AssignParty = ({ setUpDocket }) => {
    const [partyToAdd, setPartyToAdd] = useState({
        filerId: 0,
        partyTypeId: 0,
        proSeStatus: true,
        firmId: 0,
        partyId: 0
    })
    const [filers, SetFilers] = useState([])
    const [partyTypes, SetPartyTypes] = useState([])
    const [isAttorney, setIsAttorney] = useState(false)
    const [firms, setFirms] = useState([])
    const { docketId } = useParams()
    const history = useHistory()

    useEffect(
        () => {
            getFilers()
                .then(SetFilers)
            getPartyTypes()
                .then(SetPartyTypes)
            getFirms()
                .then(setFirms)
        }, []
    )

    useEffect(
        () => {
            //debugger
            const selectedFiler = filers.find(filer => partyToAdd.filerId == filer.id)
            let attorneyCheck = false
            if (selectedFiler) {
                attorneyCheck = selectedFiler.filerType.filerType === "attorney"
            }
            setIsAttorney(attorneyCheck)
        }, [filers, partyToAdd]
    )

    const handleForm = (event) => {
        const copy = JSON.parse(JSON.stringify(partyToAdd))
        if (event.target.name !== "proSeStatus") {
            copy[event.target.name] = parseInt(event.target.value)
        } else {
            copy[event.target.name] = event.target.value
        }
        setPartyToAdd(copy)
    }

    const submitParty = () => {
        const filerObject = JSON.parse(JSON.stringify(partyToAdd))
        assignParty(docketId, filerObject)
            .then(() => {
                setUpDocket(docketId)
                setPartyToAdd({
                    filerId: 0,
                    partyTypeId: 0,
                    proSeStatus: true,
                    firmId: 0,
                    partyId: 0
                })
                // history.push(`/dockets/${docketId}`)
            })
    }

    return <div>Assign parties for docket {docketId}
        <div>
            <label htmlFor="filerId">Select Filer: </label>
            <select name="filerId"
                onChange={handleForm}
                value={partyToAdd.filerId}
            >
                <option value="0" hidden>Select a Filer To Add</option>
                {
                    filers.map(filer => {
                        return <option key={`filer-${filer.id}`} value={filer.id}>
                            {filer.user.firstName} {filer.user.lastName}
                        </option>
                    })
                }
            </select>
        </div>
        {
            isAttorney
                ? partyToAdd.proSeStatus
                    ? <div>Attorney check success
                        <div>
                            Filer is attorney, but is pro se
                        </div>
                        <button onClick={e => {
                            let copy = JSON.parse(JSON.stringify(partyToAdd))
                            copy.proSeStatus = false
                            setPartyToAdd(copy)
                        }}>Swap to Client Selection</button>
                    </div>
                    : <div>
                        <button onClick={e => {
                            let copy = JSON.parse(JSON.stringify(partyToAdd))
                            copy.proSeStatus = true
                            setPartyToAdd(copy)
                        }}>Attorney is pro se in this docket</button>
                        <div>Attorney ready to file for client</div>
                        <div>

                            <label htmlFor="firmId">Select Attorney's Firm: </label>
                            <select name="firmId"
                                onChange={handleForm}
                                value={partyToAdd.firmId}
                            >
                                <option value="0" hidden>Select a Firm To Add</option>
                                {
                                    firms.map(firm => {
                                        return <option key={`firm-${firm.id}`} value={firm.id}>
                                            {firm.name}
                                        </option>
                                    })
                                }
                            </select>
                            <label htmlFor="partyId">Select Attorney's Client: </label>
                            <select name="partyId"
                                onChange={handleForm}
                                value={partyToAdd.partyId}
                            >
                                <option value="0" hidden>Select a Filer To Add</option>
                                {
                                    filers.map(filer => {
                                        return <option key={`filer-${filer.id}`} value={filer.id}>
                                            {filer.user.firstName} {filer.user.lastName}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                : null
        }
        <div>
            <label htmlFor="partyTypeId">Select PartyType: </label>
            <select name="partyTypeId"
                onChange={handleForm}
                value={partyToAdd.partyTypeId}
            >
                <option value="0" hidden>Select a PartyType To Add</option>
                {
                    partyTypes.map(partyType => {
                        return <option key={`partyType-${partyType.id}`} value={partyType.id}>
                            {partyType.partyType}
                        </option>
                    })
                }
            </select>
        </div>
        <button onClick={submitParty}>
            Add Filer
        </button>
    </div>
}