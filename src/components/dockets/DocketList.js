import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getFiler } from "../filers/FilerManager"
import { getDockets, getDocketsByFiler, getDocketsBySearchAndFiler, getDocketsSearch, getOpenDocketsByFiler } from "./DocketManager"
import "./Docket.css"


export const DocketList = ({ home }) => {
    const [dockets, SetDockets] = useState([])
    const [filer, SetFiler] = useState()
    const [searchTerm, SetSearchTerm] = useState("")
    let { filerId } = useParams()

    if(home) {
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

    useEffect(
        () => {
            if(searchTerm.length > 0) {
                if(filerId) {
                    getDocketsBySearchAndFiler(filerId, searchTerm)
                        .then(SetDockets)
                } else {
                    getDocketsSearch(searchTerm)
                        .then(SetDockets)
                }
            }
        }, [searchTerm]
    )

    const handleSearch = (event) => {
        event.preventDefault()
        SetSearchTerm(event.target.value)
    }


    return <div>
        {
            filer
                ? <h2>
                    {home ? "Open " : ""}Dockets for {filer.user.firstName} {filer.user.lastName}
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
            home
                ? null
                : <div>
                <div>Search Cases By Case Number</div>
                <input type="text" onChange={handleSearch} value={searchTerm} name="numberSearch" />
            </div>
        }
        {
            dockets?.map(docket => {
                return <div key={`docket-${docket.id}`} className="docketCard">
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