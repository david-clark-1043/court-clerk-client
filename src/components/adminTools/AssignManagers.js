import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { assignManager, getAllAdmins } from "./AdminManager"

export const AssignManagers = () => {
    const [admins, SetAdmins] = useState([])
    const [managerId, SetManagerId] = useState(0)
    const { docketId } = useParams()
    const history = useHistory()

    useEffect(
        () => {
            getAllAdmins()
                .then(SetAdmins)
        }, []
    )

    const submitManager = () => {
        const managerObject = {managerId: managerId}
        assignManager(docketId, managerObject)
            .then(() => {
                history.push(`/dockets/${docketId}`)
            })
    }

    return <div>Assign managers for docket {docketId} 
        <div>
            <label htmlFor="managerId">Select Manager: </label>
            <select name="managerId"
                onChange={(e) => SetManagerId(parseInt(e.target.value))}
                value={managerId}
                >
                <option value="0" hidden>Select a Manager To Add</option>
                {
                    admins.map(admin => {
                        return <option key={`admin-${admin.id}`} value={admin.id}>{admin.user.firstName} {admin.user.lastName}</option>
                    })
                }
            </select>
        </div>
        <button onClick={submitManager}>
            Add Manager
        </button>
    </div>
}