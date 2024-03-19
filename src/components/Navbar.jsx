import React from 'react'
import { IoIosLogOut } from "react-icons/io";

function Navbar() {
    const logoutAdmin = () => {
        sessionStorage.removeItem("adminToken")
        window.location.href = "/"
    }
    return (
        <nav className="navbar navbar-header navbar-expand navbar-light ">
            <a className="sidebar-toggler" href="#"><span className="navbar-toggler-icon" /></a>
            <button className="btn navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav d-flex align-items-center navbar-light ml-auto">
                    <li className="dropdown">
                        <a className="dropdown-item" style={{ cursor: "pointer" }} onClick={logoutAdmin}><IoIosLogOut /> Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar