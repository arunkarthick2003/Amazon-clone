import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Login.css';
import { auth } from './firebase';

function Login() {
  const navigate=useNavigate();//it allows us to programatically change the url
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const signIn = e=>{
    e.preventDefault();
    //some fancy firebase login
    auth.signInWithEmailAndPassword(email,password).then(auth=>{
      navigate('/');
    })
    .catch(error=> alert(error.message))
  }
  const register=e=>{
    //some fancy firebase register
    auth.createUserWithEmailAndPassword(email,password).then((auth)=>{
      //creation of new user was successful
      if(auth){
        navigate('/');
      }
    })
    .catch(error => alert(error.message));
  }

  return (
    <div className='login'>
      <Link to="/">
        <img className='login__logo'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
        alt='' />
      </Link>

      {/* Create the login container */}
      <div className='login__container'>
        <h1>Sign-in</h1>
        <form>
          <h5>Email</h5>
          <input type="text" value={email} onChange={e =>setEmail(e.target.value)} />
          <h5>Password</h5>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} /><br/>
          <button type='submit' className='login__signinbtn' onClick={signIn}>Sign In</button>
        </form>

        <p>
          By continuing, you agree to the terms and conditions
        </p>
        <button className='login__registerbtn' onClick={register}>Create your amazon account</button>
      </div>
    </div>
  )
}

export default Login