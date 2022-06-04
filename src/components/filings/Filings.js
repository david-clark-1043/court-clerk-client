import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getFiling } from "./FilingManager"

export const Filing = () => {
    const [filing, SetFiling] = useState()
    const [filingJSX, SetFilingJSX] = useState(<div>loading...</div>)
    const { filingId } = useParams()

    useEffect(
        () => {
            // get profile of filing id
            getFiling(filingId)
                .then(SetFiling)
        }, []
    )

    useEffect(
        () => {
            if (filing) {
                // let jsx = <div>Profile</div>
                // for (const property in filing){
                //     jsx += <div id={`${property}`}>{filing[property]}</div>
                // }
                let jsx = <div className="profileInfo">
                    <h1>Filing</h1>
                    <div>
                        <div>
                            Case:{" "}
                            <Link to={`/dockets/${filing.docket.id}`}>
                                {filing.docket.caseName}
                            </Link>
                        </div>
                        <div>Case Num: {filing.docket.caseNum}</div>
                        <div>Doc Num: {filing.docketIndex}</div>
                        <div>Case Start Date: {filing.docket.createdOn}</div>
                    </div>
                    <div>
                        <div>Type: {filing.filingType.filingType}</div>
                    </div>
                    <div>
                        <div>
                            Filer:{" "}
                            <Link to={`/profiles/${filing.filer.id}`}>
                                {filing.filer.user.firstName} {filing.filer.user.lastName}
                            </Link>
                        </div>
                    </div>
                    <div>
                        <a href={filing.fileUrl}>
                            Link to File
                        </a>
                    </div>
                </div>
                SetFilingJSX(jsx)
            }
        }, [filing]
    )

    return <div>
        {filingJSX}
    </div>
}