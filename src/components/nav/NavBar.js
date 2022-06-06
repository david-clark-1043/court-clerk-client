import React from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const history = useHistory()
    const filerId = localStorage.getItem("filerId")
    const adminCheck = localStorage.getItem("admin") === "true"

    return (
        <ul className="navbar">
            <li className="navbar__item">
                CourtClark™
            </li>
            <li className="navbar__item">
                <Link to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link to="/filings/new">Start A Filing</Link>
            </li>
            <li className="navbar__item">
                <Link to={`/dockets/filers/${filerId}`}>Your Cases</Link>
            </li>
            <li className="navbar__item">
                <Link to="/dockets">Search Cases</Link>
            </li>
            {
                adminCheck
                ? <li className="navbar__item">
                    <Link to="/filers">Filer Manager</Link>
                </li>
                : null
            }
            <li className="navbar__item">
                <Link to={`/profiles/${filerId}`}>My Profile</Link>
            </li>
            {
                (localStorage.getItem("courtz_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("courtz_token")
                                localStorage.removeItem("filerId")
                                localStorage.removeItem("admin")
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