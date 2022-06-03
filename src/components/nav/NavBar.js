import React from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { Route } from "react-router-dom"

export const NavBar = () => {
    const history = useHistory()
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link to="/dockets">Dockets</Link>
            </li>
            <li className="navbar__item">
                Navigation link
            </li>
            {
                (localStorage.getItem("courtz_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("courtz_token")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}