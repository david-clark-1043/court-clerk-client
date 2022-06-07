import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { Link, useHistory } from "react-router-dom"
import { getFiler, updateFiler } from "./FilerManager"
import humps from "humps";

// import "./Auth.css"

export const EditFiler = ({ newFiler }) => {
    const [filer, SetFiler] = useState({
        "username": "",
        "firstName": "",
        "lastName": "",
        "email": "",
        "addressLine1": "",
        "addressLine2": "",
        "addressCity": "",
        "stateCode": "",
        "zipCode": "",
        "phoneNum": "",
        "filerTypeId": 1
    })
    const { filerId } = useParams()
    const history = useHistory()

    useEffect(
        () => {
            if (!newFiler) {
                getFiler(filerId)
                    .then((filer) => {
                        const newUser = {
                            "username": filer.user.username,
                            "firstName": filer.user.firstName,
                            "lastName": filer.user.lastName,
                            "email": filer.user.email,
                            "addressLine1": filer.addressLine1,
                            "addressLine2": filer.addressLine2,
                            "addressCity": filer.addressCity,
                            "stateCode": filer.stateCode,
                            "zipCode": filer.zipCode,
                            "phoneNum": filer.phoneNum,
                            "filerTypeId": filer.filerType.id
                        }
                        SetFiler(newUser)
                    })
            }
        }, []
    )

    const handleChange = (event) => {
        event.preventDefault()
        const copy = JSON.parse(JSON.stringify(filer))
        if (event.target.name === "filerTypeId") {
            copy[event.target.name] = parseInt(event.target.value)
        } else {
            copy[event.target.name] = event.target.value
        }
        SetFiler(copy)
    }

    const editFiler = (e) => {
        e.preventDefault()
        if (!newFiler) {

            updateFiler(filerId, filer)
                .then(() => {
                    history.push(`/profiles/${filerId}`)
                })
        } else {
            fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(humps.decamelizeKeys(filer))
            })
            .then(res => res.json())
            .then((res) => {
                debugger
                history.push(`/profiles/${res.filer_id}`)
            })
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <form className="form--login" onSubmit={editFiler}>
                <h1 className="h3 mb-3 font-weight-normal">{newFiler ? "Add a new" : "Update this"} Filer</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={handleChange} value={filer.firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={handleChange} value={filer.lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputUsername">Username</label>
                    <input onChange={handleChange} value={filer.username} type="text" name="username" className="form-control" placeholder="Username" required />
                </fieldset>
                {
                    newFiler
                        ? <>
                            <fieldset>
                                <label htmlFor="inputPassword"> Password </label>
                                <input onChange={handleChange} value={filer.password} type="password" name="password" className="form-control" placeholder="Password" required />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="verifyPassword"> Verify Password </label>
                                <input  type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                            </fieldset>
                        </>
                        : null
                }
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange} value={filer.email} type="text" name="email" className="form-control" placeholder="email" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="addressLine1"> Address Line 1 </label>
                    <input onChange={handleChange} value={filer.addressLine1} type="text" name="addressLine1" className="form-control" placeholder="Address Line 1" />
                </fieldset>
                <fieldset>
                    <label htmlFor="addressLine2"> Address Line 2 </label>
                    <input onChange={handleChange} value={filer.addressLine2} type="text" name="addressLine2" className="form-control" placeholder="Address Line 2" />
                </fieldset>
                <fieldset>
                    <label htmlFor="addressCity"> City </label>
                    <input onChange={handleChange} value={filer.addressCity} type="text" name="addressCity" className="form-control" placeholder="Address City" />
                </fieldset>
                <fieldset>
                    <label htmlFor="stateCode"> State Code </label>
                    <input onChange={handleChange} value={filer.stateCode} type="text" name="stateCode" className="form-control" placeholder="State" />
                </fieldset>
                <fieldset>
                    <label htmlFor="zipCode"> Add zipCode </label>
                    <input onChange={handleChange} value={filer.zipCode} type="text" name="zipCode" className="form-control" placeholder="Zip Code" />
                </fieldset>
                <fieldset>
                    <label htmlFor="phoneNum"> Add Phone Number </label>
                    <input onChange={handleChange} value={filer.phoneNum} type="text" name="phoneNum" className="form-control" placeholder="Phone" />
                </fieldset>
                <fieldset>
                    <label htmlFor="filerTypeId"> Add Filer Type </label>
                    <input onChange={handleChange} value={filer.filerTypeId} type="text" name="filerTypeId" className="form-control" placeholder="Filer Type" />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
        </main>
    )
}