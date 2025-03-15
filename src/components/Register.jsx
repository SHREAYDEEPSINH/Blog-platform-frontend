import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router'

function Register() {

    const [registerUser, setRegisterUser] = useState({ userName: "", email: "", password: "" })
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    let registerHandle = async (e) => {
        e.preventDefault()

        if (!registerUser.userName || !registerUser.email || !registerUser.password) {
            setError("All inputs required")
            return
        }

        try {
            await axios.post("https://blog-platform-backend-c19i.onrender.com/user/register", registerUser)
            setSuccess("Ragistration successfully")
            setError("")
        } catch (error) {
            setError(error || "registration failed")
            setSuccess("");
        }
    }

    return (
        <>
            <div className="register-page">
                <div className="card card-custom p-4 w-100" style={{ maxWidth: "400px" }}>
                    <h2 className="mb-3 text-center text-white">Register Page</h2>

                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={registerHandle}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label text-white">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={registerUser.userName}
                                onChange={(e) => setRegisterUser({ ...registerUser, userName: e.target.value })}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label text-white">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={registerUser.email}
                                onChange={(e) => setRegisterUser({ ...registerUser, email: e.target.value })}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label text-white">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={registerUser.password}
                                onChange={(e) => setRegisterUser({ ...registerUser, password: e.target.value })}
                            />
                        </div>

                        <button type="submit" className="btn btn-dark w-100 text-white">Register</button>
                    </form>
                    <div className="text-center mt-3">
                        <p>Already have an account? <Link to="/login">Login here</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register