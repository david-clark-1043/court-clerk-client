import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { deactivateFiler, getFiler } from "./FilerManager"
import "./Profile.css"

export const Profile = () => {
    const [filer, SetFiler] = useState()
    const [filerJSX, SetFilerJSX] = useState(<div>loading...</div>)
    const adminCheck = localStorage.getItem("admin") === "true"
    const { filerId } = useParams()
    const history = useHistory()

    useEffect(
        () => {
            // get profile of filer id
            getFiler(filerId)
                .then(SetFiler)
        }, []
    )

    const closeAccount = () => {
        deactivateFiler(filerId)
            .then(() => {
                localStorage.removeItem("courtz_token")
                localStorage.removeItem("filerId")
                localStorage.removeItem("admin")
                history.push({ pathname: "/" })
            })
    }

    useEffect(
        () => {
            if (filer) {
                // let jsx = <div>Profile</div>
                // for (const property in filer){
                //     jsx += <div id={`${property}`}>{filer[property]}</div>
                // }
                let jsx = <div className="profileInfo">
                    <h1>Profile</h1>
                    <div className="profileName">Name: {filer.user.firstName} {filer.user.lastName}</div>
                    <div className="addressBlock">
                        <div className="addressStart">Address:</div>
                        <div className="addressContent">
                            <div className="addressLine1">{filer.addressLine1}</div>
                            <div className="addressLine2">{filer.addressLine2}</div>
                            <div className="addressLine3">{filer.addressCity}, {filer.stateCode} {filer.zipCode}</div>
                        </div>
                    </div>
                    <div className="email">Email: {filer.user.email}</div>
                    <div className="phone">Phone: {filer.phoneNum}</div>
                    <div className="filerType">Filer Type: {filer.filerType.filerType}</div>
                    <div>
                        <Link to={`/dockets/filers/${filer.id}`}>
                            Cases
                        </Link>
                    </div>
                    <div>
                        {
                            adminCheck
                                ? null
                                : <button onClick={closeAccount}>
                                    Close my account
                                </button>
                        }
                    </div>
                    <div>
                        <Link to={`/filers/${filerId}/edit`}>
                            Edit This Profile
                        </Link>
                    </div>
                </div>
                SetFilerJSX(jsx)
            }
        }, [filer]
    )

    return <div>
        {filerJSX}
    </div>
}