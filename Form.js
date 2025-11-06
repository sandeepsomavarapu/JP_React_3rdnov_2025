import { Link, Routes, Route } from "react-router-dom"
import Login from "./Components/Login"
import Products from "./Components/Products"
import Employees from "./Components/Employees"
import About from "./Components/About"
import Home from "./Components/Home"
import Register from "./Components/Register"
import EditEmployee from "./Components/EditEmployee"
import AddEmployee from "./Components/AddEmployee"
const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token");
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            {
              !isLoggedIn &&
              (
                <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/login">Login</Link>
                </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/register">Register</Link>
                  </li>
                </>

              )}

            {
            isLoggedIn && (
              <>
              <li className="nav-item">
                <Link className="nav-link active" to="/products">Products</Link>
              </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/employees">Employees</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/home">Home</Link>
                </li>

                <li className="nav-item">
                  <button className="nav-link active" onClick={() => {
                    localStorage.removeItem("token")
                    alert("Logged out successfully")
                    window.location.href = "/login"
                  }}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/employees" element={<Employees />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/edit/:id" element={<EditEmployee />}></Route>
        <Route path="/addemp" element={<AddEmployee />}></Route>

      </Routes>

    </div>
  )
}

export default Navbar
