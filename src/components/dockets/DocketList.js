import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getFiler } from "../filers/FilerManager"
import { getDockets, getDocketsByFiler, getOpenDocketsByFiler } from "./DocketManager"

export const DocketList = ({ home }) => {
    const [dockets, SetDockets] = useState([])
    const [filer, SetFiler] = useState()
    let { filerId } = useParams()

    if(!filerId) {
        filerId = localStorage.getItem("filerId")
    }

    useEffect(
        () => {
            if(filerId) {
                if(home) {
                    getOpenDocketsByFiler(filerId)
                        .then(SetDockets)
                } else {
                    getDocketsByFiler(filerId)
                        .then(SetDockets)
                }
                getFiler(filerId)
                    .then(SetFiler)
            } else {
                getDockets()
                    .then(SetDockets)
            }
        }, []
    )


    return <div>
        {
            filer
                ? <h2>
                    Dockets for {filer.user.firstName} {filer.user.lastName}
                </h2>
                : null
        }
        {
            dockets?.length == 0
            ? <div>
                <div>No{home ? " open " : " "}cases</div>
                {
                    home
                        ? <Link to={`/dockets/filers/${filerId}`}>See Closed Cases</Link>
                        : null
                }
            </div>
            : null
        }
        {
            dockets?.map(docket => {
                return <div key={`docket-${docket.id}`}>
                    <div>Case Number: {docket.caseNum}</div>
                    <div>
                        <Link to={`/dockets/${docket.id}`}>
                        Title: {docket.caseName}
                        </Link>
                    </div>
                    <div>Status: {docket.status.statusLabel}</div>
                </div>
            })
        }
    </div>
}