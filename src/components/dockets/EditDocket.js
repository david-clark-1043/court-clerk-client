import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { unassignManager, unassignParty } from "../adminTools/AdminManager"
import { AssignManagers } from "../adminTools/AssignManagers"
import { AssignParty } from "./AssignParty"
import { getDocket } from "./DocketManager"
import "./EditDocket.css"

export const EditDocket = () => {
    const [docket, SetDocket] = useState()
    const { docketId } = useParams()

    const setUpDocket = (docketId) => {
        getDocket(docketId)
            .then(SetDocket)
    }

    useEffect(
        () => {
            if(docketId) {
                setUpDocket(docketId)
            }
        }, [docketId]
    )

    const removeParty = (event) => {
        event.preventDefault()
        const filerObject = {
            filerId: parseInt(event.target.id.split("-")[1])
        }
        unassignParty(docketId, filerObject)
            .then(() => {
                setUpDocket(docketId)
                // history.push(`/dockets/${docketId}`)
            })
    }

    const removeManager = (event) => {
        event.preventDefault()
        const managerObject = {
            managerId: parseInt(event.target.id.split("-")[1])
        }
        unassignManager(docketId, managerObject)
            .then(() => {
                setUpDocket(docketId)
            })
    }

    return <>
        <div>editing docket {docketId}</div>
        <div>{docket?.caseName}</div>
        <div className="managers">
            <div> Managers </div>
            {
                docket?.managers.map(manager => {
                    return <div className="managerCard">
                        <div>{manager.user.firstName} {manager.user.lastName}</div>
                        <button onClick={removeManager} id={`docketManager-${manager.user.id}`}>
                            Remove Manager
                        </button>
                    </div>
                })
            }
        </div>
        <AssignManagers />
        <div>
            Parties
            {
                docket?.parties.map(party => {
                    return <div className="partyCard">
                        {/* {JSON.stringify(party.party)} */}
                        <div>Party: <Link to={`/profiles/${party.party.user.id}`}>
                            {party.party.user.firstName} {party.party.user.lastName}
                            </Link>
                        </div>
                        <div>Party Type: {party.partyType.partyType}</div>
                        <button onClick={removeParty} id={`buttonParty-${party.party.user.id}`}>Remove Party</button>
                    </div>
                })
            }
        </div>
        <div>Add Party</div>
        <AssignParty setUpDocket={setUpDocket} />
    </>
}