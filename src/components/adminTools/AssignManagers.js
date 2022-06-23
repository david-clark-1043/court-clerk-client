import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { assignManager, assignParty, getAllAdmins } from "./AdminManager"

export const AssignManagers = () => {
    const [admins, SetAdmins] = useState([])
    const [managerToAdd, SetManagerToAdd] = useState({
        filerId: 0,
        partyTypeId: 0,
        proSeStatus: true,
    })
    const { docketId } = useParams()
    const history = useHistory()

    useEffect(
        () => {
            getAllAdmins()
                .then(SetAdmins)
        }, []
    )

    const submitManager = () => {
        assignParty(docketId, managerToAdd)
            .then(() => {
                history.push(`/dockets/${docketId}`)
            })
    }

    return <div>Assign managers for docket {docketId} 
        <div>
            <label htmlFor="managerId">Select Manager: </label>
            <select name="managerId"
                onChange={(e) => {
                    const filerId = parseInt(e.target.value.split("-")[0])
                    const partyTypeId = parseInt(e.target.value.split("-")[1])
                    let copy = JSON.parse(JSON.stringify(managerToAdd))
                    copy.filerId = filerId
                    copy.partyTypeId = partyTypeId
                    SetManagerToAdd(copy)
                }}
                value={`${managerToAdd.filerId}-${managerToAdd.partyTypeId}`}
                >
                <option value="0-0" hidden>Select a Manager To Add</option>
                {
                    admins.map(admin => {
                        return <option key={`admin-${admin.id}`} value={`${admin.id}-${admin.filerType.id}`}>{admin.user.firstName} {admin.user.lastName}</option>
                    })
                }
            </select>
        </div>
        <button onClick={submitManager}>
            Add Manager
        </button>
    </div>
}