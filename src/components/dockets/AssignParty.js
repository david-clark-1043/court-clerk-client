import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { assignParty } from "../adminTools/AdminManager"
import { getParties, getPartyTypes } from "../filers/FilerManager"

export const AssignParty = ({ setUpDocket }) => {
    const [filers, SetFilers] = useState([])
    const [filerId, SetFilerId] = useState(0)
    const [partyTypes, SetPartyTypes] = useState([])
    const [partyTypeId, SetPartyTypeId] = useState(0)
    const { docketId } = useParams()
    const history = useHistory()

    useEffect(
        () => {
            getParties()
                .then(SetFilers)
            getPartyTypes()
                .then(SetPartyTypes)
        }, []
    )

    const submitParty = () => {
        const filerObject = {
            filerId: filerId,
            partyTypeId: partyTypeId
        }
        assignParty(docketId, filerObject)
            .then(() => {
                setUpDocket(docketId)
                SetFilerId(0)
                SetPartyTypeId(0)
                // history.push(`/dockets/${docketId}`)
            })
    }

    return <div>Assign parties for docket {docketId} 
        <div>
            <label htmlFor="filerId">Select Filer: </label>
            <select name="filerId"
                onChange={(e) => SetFilerId(parseInt(e.target.value))}
                value={filerId}
                >
                <option value="0" hidden>Select a Filer To Add</option>
                {
                    filers.map(filer => {
                        return <option key={`filer-${filer.id}`} value={filer.id}>{filer.user.firstName} {filer.user.lastName}</option>
                    })
                }
            </select>
        </div>
        <div>
            <label htmlFor="partyTypeId">Select PartyType: </label>
            <select name="partyTypeId"
                onChange={(e) => SetPartyTypeId(parseInt(e.target.value))}
                value={partyTypeId}
                >
                <option value="0" hidden>Select a PartyType To Add</option>
                {
                    partyTypes.map(partyType => {
                        return <option key={`partyType-${partyType.id}`} value={partyType.id}>{partyType.partyType}</option>
                    })
                }
            </select>
        </div>
        <button onClick={submitParty}>
            Add Filer
        </button>
    </div>
}