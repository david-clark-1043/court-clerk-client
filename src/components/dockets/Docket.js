import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDocket } from "./DocketManager"

export const Docket = () => {
    const [docket, SetDocket] = useState()
    const { docketId } = useParams()

    useEffect(
        () => {
            if(docketId) {
                getDocket(docketId)
                    .then(SetDocket)
            }
        }, [docketId]
    )

    return <div>
        <div>Case Title</div>
        <div>{docket?.caseNum}</div>
        <div>
            {
                docket?.managers.map(manager => {
                    return <div>manager list</div>
                })
            }
        </div>
        <div>
            {
                docket?.filings.map(filing => {
                    return <div>
                        {JSON.stringify(filing)}
                        <div>Docket Number: {filing.docketIndex}</div>
                        <div>Filer: {filing.filer.firstName} {filing.filer.lastName}</div>
                        </div>
                })
            }
        </div>
    </div>
}