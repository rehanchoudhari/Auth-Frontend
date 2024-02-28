import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { googleLoginApi, facebookLoginApi } from '../fetcher'
import { connect } from 'react-redux';
import { login } from '../action/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const {email, password} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    React.useEffect(() =>{
        if(isAuthenticated){
            navigate('/')
        }
    }, [isAuthenticated, navigate])

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    }

    const continueWithGoogle =  async () => {
        const res = await googleLoginApi();
        window.location.replace(res.data.authorization_url? res.data.authorization_url: null);
    }

    const continueWithFacebook = async () => {
        const res = await facebookLoginApi();
        window.location.replace(res.data.authorization_url? res.data.authorization_url: null);
    }

  return (
    <div className='container mt-5'>
        <h1>Sign In</h1>
        <p>Sign into your Account</p>
        <form onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
                <input 
                    className='form-control' 
                    type='email'
                    name='email'
                    placeholder='Email' 
                    value={email}
                    onChange={e => onChange(e)}
                    required 
                />
            </div>
            <div className='form-group'>
                <input
                    className='form-control'
                    type='password'
                    placeholder='password'
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}
                    minLength='2'
                    required
                />
            </div>
            <button className='btn btn-primary' type='submit'>Login</button>
        </form>
        <button className='btn btn-danger mt-3' onClick={continueWithGoogle}>
            Continue With Google
        </button><br/>
        <button className='btn btn-primary mt-3' onClick={continueWithFacebook}>
            Continue With Facebook
        </button>
        <p className='mt-3'>
            Don't have an account?<Link to='/signup'>Signup</Link>
        </p>
        <p className='mt-3'>
            Forgot your password? <Link to='/reset-password'>Reset Password</Link>
        </p>
    </div>
  )
};


const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);