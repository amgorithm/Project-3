import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import userService from '../../utils/userService';
import useUser from '../../hooks/useUser';

function LoginPage() {
  const navigate = useNavigate()
  const { handleSignupOrLogin } = useUser()

  const [formState, setFormState] = React.useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(formState);
      // Let <App> know a user has signed up!
      handleSignupOrLogin();
      // Successfully signed up - show GamePage
      navigate('/');
    } catch (err) {
      // Use a modal or toast in your apps instead of alert
      alert('Invalid Credentials!');
    }
  }

  return (
    <div className='back'>
      <div className='main'>
      <form className='form' onSubmit={handleSubmit} >
        <div >
          <div >
            <input type="email"  placeholder="Email" value={formState.email} name="email" onChange={handleChange} />
          </div>
        </div>
        <div >
          <div >
            <input type="password"  placeholder="Password" value={formState.password} name="password" onChange={handleChange} />
          </div>
        </div>
        <div >
          {/* <div className="col-sm-12 text-center buttons group"> */}
            <button >Log In</button>&nbsp;&nbsp;&nbsp;
            <button ><Link to='/' style={{textDecoration: "none"}}><p>Cancel</p></Link></button>
          {/* </div> */}
        </div>
      </form>
      </div>
    </div>
  );
}

export default LoginPage;
