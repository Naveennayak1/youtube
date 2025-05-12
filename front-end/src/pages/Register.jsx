import React, { useState } from "react";
import axios from "axios";
import { useNavigate , Link } from "react-router-dom";

const Register =()=>{

const [username , setUserName] = useState('');
const [email , setEmail] = useState('');
const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();



  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError('');
    setSuccessMsg('');


    try{
        await axios.post('http://localhost:5000/api/auth/signup' , {username , email , password, avatar});
        setSuccessMsg('Registration successful! You can now login.');
        setTimeout(() => navigate('/login'), 2000);
    }
    catch(err){
        setError(err.response ?.data ?.message || 'Registration failed')
    }

  } ;


return (
<div style={{ maxWidth: '400px', margin: '50px auto' }}>  
<h2>Register</h2>
{error  && <p style={{ color: 'red'}}>{error}</p>}
{successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
<form onSubmit={handleSubmit}>
    <div>
        <label>UserName</label> <br />
        <input  type="text" value={username} onChange={e=>setUserName(e.target.value)}/>
    </div>
    <div>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Avatar URL (optional):</label><br />
          <input type="text" value={avatar} onChange={e => setAvatar(e.target.value)} />
        </div>
        <div>
          <label>Password:</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default Register;
