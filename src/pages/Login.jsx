import React, { useState } from 'react'
import { CiLock, CiUser } from "react-icons/ci";
import { adminLogin } from '../global/apiCall';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorHandler, successHandler } from '../global/responseHandler';

function Login() {
    const [loginData, setLoginData] = useState({ email: "", password: "" })

    const getLoginInfo = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const handleLoginForm = async (e) => {
        e.preventDefault()

        await adminLogin(loginData)
            .then((response) => {
                // console.log("🚀 ~ .then ~ response:", response)
                successHandler(response.data.message)
                sessionStorage.setItem("adminToken", response.data.adminToken)
                setTimeout(() => {
                    window.location.href = "/"
                }, 2000);
            })
            .catch((error) => {
                // console.log("🚀 ~ handleLoginForm ~ error:", error)
                errorHandler(error.response.data.message)
            })
    }
    return (
        <div id="auth">
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <div className="col-md-5 col-sm-12 mx-auto">
                        <div className="card pt-4">
                            <div className="card-body">
                                <div className="text-center mb-5">
                                    <img src="assets/images/16368975771.jpg" height={48} className="mb-4" />
                                    <h3>Sign In</h3>
                                    <p>Please sign in to continue to Voler.</p>
                                </div>
                                <form method="post" onSubmit={handleLoginForm}>
                                    <div className="form-group position-relative has-icon-left">
                                        <label htmlFor="email">Email</label>
                                        <div className="position-relative">
                                            <input type="email" name="email" className="form-control" id="email" onChange={getLoginInfo} />
                                            <div className="form-control-icon">
                                                <CiUser />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group position-relative has-icon-left">
                                        <div className="clearfix">
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <div className="position-relative">
                                            <input type="password" name="password" className="form-control" id="password" onChange={getLoginInfo} />
                                            <div className="form-control-icon">
                                                <CiLock />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix">
                                        <button className="btn btn-primary float-end" type='submit'>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login