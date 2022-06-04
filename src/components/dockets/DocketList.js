import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getFiler } from "../filers/FilerManager"
import { getDockets, getDocketsByFiler } from "./DocketManager"

export const DocketList = () => {
    const [dockets, SetDockets] = useState([])
    const [filer, SetFiler] = useState()
    const { filerId } = useParams()

    useEffect(
        () => {
            if(filerId) {
                const docketAsync = getDocketsByFiler(filerId)
                    .then(SetDockets)
                const filerAsync = getFiler(filerId)
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
                ? <div>Dockets for {filer.user.firstName} {filer.user.lastName}</div>
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
                </div>
            })
        }
    </div>
}