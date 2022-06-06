import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { demoteAdmin, promoteAdmin } from "../adminTools/AdminManager"
import { activateFiler, deactivateFiler, getFilers } from "./FilerManager"

export const Filers = () => {
    const [filers, SetFilers] = useState([])
    const [jsx, SetJSX] = useState(<div></div>)
    const adminCheck = localStorage.getItem("admin") === "true"

    const refresh = () => {
        if (!adminCheck) {
            SetJSX(<div>Must be admin to access this page</div>)
        } else {
            getFilers()
                .then(SetFilers)
        }
    }

    useEffect(
        () => {
            refresh()
        }, []
    )

    const changeAdmin = (event) => {
        event.preventDefault()
        const userId = parseInt(event.target.id.split("-")[1])
        if (event.target.checked) {
            promoteAdmin(userId)
                .then(() => refresh())
        } else {
            demoteAdmin(userId)
                .then(() => refresh())
        }
    }

    const changeActive = (event) => {
        event.preventDefault()
        const userId = parseInt(event.target.id.split("-")[1])
        if (event.target.checked) {
            activateFiler(userId)
                .then(() => refresh())
        } else {
            deactivateFiler(userId)
                .then(() => refresh())
        }
    }

    return <div>
        <table>
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Active</th>
                </tr>
            </thead>
            <tbody>
                {
                    filers.map(filer => {
                        return <tr key={`filertable-${filer.id}`}>
                            {/* {JSON.stringify(filer)} */}
                            <td>{filer.id}</td>
                            <td>
                                <Link to={`/profiles/${filer.id}`}>
                                    {filer.user.firstName} {filer.user.lastName}
                                </Link>
                            </td>
                            <td>{filer.user.email}</td>
                            <td>
                                {filer.user.isStaff === true ? "true" : "false"}
                                <input
                                    type="checkbox"
                                    id={`active-${filer.id}`}
                                    onChange={changeAdmin}
                                    checked={filer.user.isStaff}
                                />
                            </td>
                            <td>
                                {filer.user.isActive === true ? "true" : "false"}
                                <input
                                    type="checkbox"
                                    id={`active-${filer.id}`}
                                    onChange={changeActive}
                                    checked={filer.user.isActive}
                                />
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
}