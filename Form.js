import React from 'react'

const Register = () => {
 const [username, setUsername] = React.useState("");
   const [password, setPassword] = React.useState("");
   const [firstname, setFirstname] = React.useState("");

   const handleSubmit = (e) => {
     e.preventDefault();
     localStorage.setItem("username", username);
     localStorage.setItem("password", password);
      console.log("Registration Successful");
   }
 
   return (
     <div>
       <form className='FormGroup m-3 p-3 border border-dark rounded' onSubmit={handleSubmit} >
         <h2>Registration Page</h2>
         <div>
           <label>Username: </label>
           <input className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
         </div>
         <div>
           <label>Password: </label>
           <input className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
         </div>
         <div>
           <label>Firstname: </label>
           <input className='form-control' value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" />
         </div>
         <button className='btn btn-primary' type="submit">Register</button>
       </form>
     </div>
   )
 }

export default Register
