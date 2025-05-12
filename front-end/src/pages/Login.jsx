import React , { useState} from 'react';
import axios from 'axios';
import {useNavigate , Link} from 'react-router-dom'


const Login =({setUser}) =>{
    const [email , setEmail] = useState('');
const [password , setPassword] = useState('');
const [error , setError] = useState('');
const navigate = useNavigate();

const handleSubmit = async (e)=>{
    e.preventDefault();
    setError('');


try{
    const res= await axios.post('http://localhost:5000/api/auth/login' , {email , password});
localStorage.setItem('token' , res.data.token);
localStorage.setItem('username' , res.data.username);
localStorage.setItem('userId' , res.data.userId);
setUser({token:res.data.token , username:res.data.username, userId:res.data.userId});
navigate('/');

}
catch(err){
    setError(err.response?.data.message || 'login failed');
}

};

return (
<div style={{ maxWidth: '400px', margin: '50px auto' }}>
<h2>Login</h2>
{error && <p style={{ color: 'red' }}>{error}</p>}
<form onSubmit={handleSubmit}>
<div>
    <label>
        Email :
    </label> <br />
    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
</div>

<div>
    <label>Password :</label> <br />
    <input type="password" value={password} onChange={e=>{setPassword(e.target.value)}} />
</div>

<button type="submit" style={{ marginTop: '10px' }}>Login</button>

</form>
<p>Don't have an account? <Link to="/register">Register here</Link></p>

</div>

);



}

export default Login;