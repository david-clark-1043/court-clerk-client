import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getFiler } from "../filers/FilerManager"
import { addRelation, getFirms, removeRelation } from "./FirmManager"

export const AddFirmRelation = () => {
    const [filer, setFiler] = useState({})
    const [firms, setFirms] = useState([])
    const { filerId } = useParams()
    const [firmToAdd, setFirmToAdd] = useState({ firmId: 0, filerId: filerId })
    const [toggleRefresh, setRefresh] = useState(false)

    const refreshUser = (filerId) => {
        return getFiler(filerId)
            .then(setFiler)
    }

    useEffect(
        () => {
            if (filerId) {
                refreshUser(filerId)
            }
            getFirms()
                .then(setFirms)
        }, []
    )

    useEffect(
        () => {
            getFiler(filerId)
                .then(setFiler)
        }, [toggleRefresh]
    )

    const handleFirmChoice = (event) => {
        const copy = { ...firmToAdd }
        copy[event.target.name] = parseInt(event.target.value)
        setFirmToAdd(copy)
    }

    const addFirm = (event) => {
        addRelation(firmToAdd)
            .then(() => refreshUser(filerId))
    }

    return <div>
        Add firm
        <div> Adding firm for user {filer?.user?.firstName} {filer?.user?.lastName}</div>
        <div>
            <div>
                Current Associated Firms
                {
                    filer?.firms?.map(firm => {
                        return <div key={`filerFirm-${firm.id}`}>
                            {firm.name} <button id={`removeButton-${firm.id}`}
                                onClick={e => {
                                    const firmId = parseInt(e.target.id.split("-")[1])
                                    const firmToRemove = {
                                        firmId: firmId,
                                        filerId: filerId
                                    }
                                    removeRelation(firmToRemove)
                                        .then(() => refreshUser(filerId))
                                }}
                            >Remove Relationship</button>

                        </div>
                    })
                }
            </div>
            <label htmlFor="firmId">Select Firm to Add to this Filer: </label>
            <select
                name="firmId"
                value={firmToAdd.firmId}
                onChange={handleFirmChoice}>
                <option value="0" hidden>Select Firm</option>
                {
                    firms?.map(firm => {
                        return <option key={`firmOption-${firm.id}`} value={firm.id}>{firm.name}</option>
                    })
                }
            </select>
        </div>
        <button onClick={addFirm}>Add Firm</button>
    </div>
}