import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getFiler } from "./FilerManager"
import "./Profile.css"

export const Profile = () => {
    const [filer, SetFiler] = useState()
    const [filerJSX, SetFilerJSX] = useState(<div>loading...</div>)
    const { filerId } = useParams()

    useEffect(
        () => {
            // get profile of filer id
            getFiler(filerId)
                .then(SetFiler)
        }, []
    )

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
                </div>
                SetFilerJSX(jsx)
            }
        }, [filer]
    )

    return <div>
        {filerJSX}
    </div>
}