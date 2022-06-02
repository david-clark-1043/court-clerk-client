import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
// import "./Auth.css"

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const email = useRef()
    const addressLine1 = useRef()
    const addressLine2 = useRef()
    const addressCity = useRef()
    const stateCode = useRef()
    const zipCode = useRef()
    const phoneNum = useRef()
    const filerTypeId = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const history = useHistory()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "email": email.current.value,
                "address_line1": addressLine1.current.value,
                "address_line2": addressLine2.current.value,
                "address_city": addressCity.current.value,
                "state_code": stateCode.current.value,
                "zip_code": zipCode.current.value,
                "phone_num": phoneNum.current.value,
                "filer_type_id": parseInt(filerTypeId.current.value),
                "password": password.current.value
            }

            return fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("courtz_token", res.token)
                        history.push("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputUsername">Username</label>
                    <input ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input ref={email} type="text" name="email" className="form-control" placeholder="email" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="addressLine1"> Add Address Line 1 </label>
                    <input ref={addressLine1} name="addressLine1" className="form-control" placeholder="Address Line 1" />
                </fieldset>
                <fieldset>
                    <label htmlFor="addressLine2"> Add Address Line 2 </label>
                    <input ref={addressLine2} name="addressLine2" className="form-control" placeholder="Address Line 2" />
                </fieldset>
                <fieldset>
                    <label htmlFor="addressCity"> Add City </label>
                    <input ref={addressCity} name="addressCity" className="form-control" placeholder="Address City" />
                </fieldset>
                <fieldset>
                    <label htmlFor="stateCode"> Add stateCode </label>
                    <input ref={stateCode} name="stateCode" className="form-control" placeholder="State" />
                </fieldset>
                <fieldset>
                    <label htmlFor="zipCode"> Add zipCode </label>
                    <input ref={zipCode} name="zipCode" className="form-control" placeholder="Zip Code" />
                </fieldset>
                <fieldset>
                    <label htmlFor="phoneNum"> Add Phone Number </label>
                    <input ref={phoneNum} name="phoneNum" className="form-control" placeholder="Phone" />
                </fieldset>
                <fieldset>
                    <label htmlFor="filerTypeId"> Add Filer Type </label>
                    <input ref={filerTypeId} name="filerTypeId" className="form-control" placeholder="Filer Type" />
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}