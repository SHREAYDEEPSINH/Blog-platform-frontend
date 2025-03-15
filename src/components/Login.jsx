import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'

function Login() {
    let navigate = useNavigate()
    let [login, setLogin] = useState({
        email: "",
        password: ""
    })
    let [error, setError] = useState("")
    let [success, setsuccess] = useState("")

    let loginHandle = async (e) => {
        e.preventDefault()
        if (!login.email || !login.password) {
            setError("all inputs required")
        }
        else {
            try {
                let res = await axios.post("https://blog-platform-frontend-eight.vercel.app/user/login", login)
                localStorage.setItem("loginuser", JSON.stringify(res.data));
                setsuccess("login successfully")
                setError("")
                navigate("/")

            } catch (error) {
                setError("Login failed" || error)
                setsuccess("")
            }
        }
    }


    return (
        <>
           
            <div className="login-page">
                <div className="card card-custom p-4 w-100" style={{ maxWidth: "400px" }}>
                    <h2 className="mb-4 text-center text-white">Login</h2>

                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <form onSubmit={loginHandle}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label text-white">Email</label>
                            <input
                                className="form-control"
                                type="email"
                                value={login.email}
                                onChange={(e) => setLogin({ ...login, email: e.target.value })}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label text-white">Password</label>
                            <input
                                className="form-control"
                                type="password"
                                value={login.password}
                                onChange={(e) => setLogin({ ...login, password: e.target.value })}
                            />
                        </div>

                        <button type="submit" className="btn btn-dark w-100 text-white">Login</button>
                    </form>
                    <div className="text-center mt-3">
                        <p>Don't have an account? <Link to="/register">Register here</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login