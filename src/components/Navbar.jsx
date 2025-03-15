import React from 'react'
import { Link, useNavigate } from 'react-router'

function Navbar() {
    let logout = () => {
        localStorage.removeItem("loginuser")
        localStorage.setItem("loginuser" , JSON.stringify({role : "user"}))
    }
    return (
        <>
            <nav className="navbar navbar-expand bg-transparent">
                <div className="container d-flex  align-items-centr">
                    <Link className="navbar-brand" to="/"><h2 className='m-0'><strong className='text-success fs-1'>S</strong>HORT<strong className='text-success fs-1'>B</strong>LOG</h2></Link>
                  
                    <div className="collapse navbar-collapse flex-grow-0 z-1 bg-white" id="navbarSupportedContent">
                      
                        <div className="dropdown">
                            <i className="bi bi-person-badge fs-2 text-success" data-bs-toggle="dropdown" aria-expanded="false"></i>
                           
                            <ul className="dropdown-menu dropdown-menu-end border-0 text-center w-auto">
                                <li><Link className="dropdown-item px-0" to="/login">Login</Link></li>
                                <li><Link className="dropdown-item px-0" to="/register">Register</Link></li>
                                <li><Link className="dropdown-item px-0" to="/login" onClick={logout}>Logout</Link></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar