import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDocket } from "./DocketManager"
import { Link } from "react-router-dom"
import "./Docket.css"

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
        <div>Case Name: {docket?.caseName}</div>
        <div>Case Number: {docket?.caseNum}</div>
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
                    return <div key={`filing-${filing.id}`} className="singleFiling">
                        <div>Docket Number: {filing.docketIndex}</div>
                        <div>Filing Type: {filing.filingType.filingType}</div>
                        <div>
                            <Link to={`/filings/${filing.id}`}>
                                Title: {filing.title}
                            </Link>
                        </div>
                        <div>Filer: {filing.filer.user.firstName} {filing.filer.user.lastName}</div>
                        </div>
                })
            }
        </div>
    </div>
}