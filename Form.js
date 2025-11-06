import React from 'react'

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginStatus, setLoginStatus] = React.useState(false);

const handleSubmit = (e) => {
  e.preventDefault();
  const uname = localStorage.getItem("username");
  const pass = localStorage.getItem("password");

  if (username === uname && password === pass) {
    alert("Login Success");
    localStorage.setItem("token", "authenticated"); 
    window.location.href = "/home"; 
  } else {
    alert("Login Failed");
  }
};
  return (
    <div>
      <form className='FormGroup m-3 p-3 border border-dark rounded' onSubmit={handleSubmit} >
        <h2>Login Page</h2>
        <div>
          <label>Username: </label>
          <input className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
        </div>
        <div>
          <label>Password: </label>
          <input className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        </div>
        <button className='btn btn-primary' type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
