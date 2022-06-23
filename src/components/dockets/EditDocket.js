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
            repFirmPartyId: parseInt(event.target.id.split("-")[1])
        }
        unassignParty(docketId, managerObject)
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
                docket?.docketParties?.map(docketParty => {
                    const filerType = docketParty.repFirmParty.party.filerType.filerType
                    const partyType = docketParty.partyType.partyType
                    const judgeOrClerk = partyType == "judge" || partyType == "clerk"
                    if(judgeOrClerk) {

                        return <div className="docketPartyCard" key={`docketManager-${docketParty.repFirmParty.id}`}>
                        <div>{docketParty.repFirmParty.party.user.firstName} {docketParty.repFirmParty.party.user.lastName}</div>
                        <button onClick={removeManager} id={`docketManager-${docketParty.repFirmParty.id}`}>
                            Remove Manager
                        </button>
                    </div>
                    }
                })
            }
        </div>
        <AssignManagers />
        <div>
            Parties
            {
                docket?.docketParties?.map(docketParty => {
                    const filerType = docketParty.repFirmParty.party.filerType.filerType
                    const partyType = docketParty.partyType.partyType
                    const judgeOrClerk = partyType != "judge" && partyType != "clerk"
                    if(judgeOrClerk) {
                        return <div className="docketPartyCard" key={`docketManager-${docketParty.repFirmParty.id}`}>
                            {/* {JSON.stringify(docketParty.docketParty)} */}
                            <div>Party: <Link to={`/profiles/${docketParty.repFirmParty.party.id}`}>
                                {docketParty.repFirmParty.party.user.firstName} {docketParty.repFirmParty.party.user.lastName}
                                </Link>
                            </div>
                            <div>Party Type: {partyType}</div>
                            <button onClick={removeManager} id={`buttonDocketParty-${docketParty.repFirmParty.id}`}>Remove party</button>
                        </div>
                    }
                })
            }
        </div>
        <div>Add Party</div>
        <AssignParty setUpDocket={setUpDocket} />
    </>
}