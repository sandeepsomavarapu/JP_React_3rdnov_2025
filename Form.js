import React from 'react'
import { Link, Routes } from 'react-router-dom'

const NavbarDemo = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/register">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/employees">Employees</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/home">Home</Link>
                        </li>

                    </ul>
                </div>
            </nav>



        </div>
    )
}

export default NavbarDemo
