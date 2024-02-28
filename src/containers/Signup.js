import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../action/auth';
import { facebookLoginApi, googleLoginApi } from '../fetcher';


const Signup = ({ signup, isAuthenticated }) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: ''
    });
    const {first_name, last_name, email, password, re_password} = formData;
    // const navigate = useNavigate();

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onSubmit = e => {
        e.preventDefault();
        if (password !== re_password) {
            setError('Password and re-password not matching.');
        } 
        else {
            signup(first_name, last_name, email, password, re_password);
            setAccountCreated(true);
        }
    };

    const continueWithGoogle =  async () => {
        const res = await googleLoginApi();
        window.location.replace(res.data.authorization_url? res.data.authorization_url: null);
    }

    const continueWithFacebook = async () => {
        const res = await facebookLoginApi();
        window.location.replace(res.data.authorization_url? res.data.authorization_url: null);
    }

    if(isAuthenticated){
        return navigate('/')
    }
    if(accountCreated){
        return navigate('/login')
    }

  return (
    <div className='container mt-5'>
       <>
        <h1>Sign Up</h1>
        <p>Create New Account</p>
        <form onSubmit={e =>onSubmit(e)}>
            <div className='form-group'>
                <input 
                    className='form-control' 
                    type='email'
                    name='email'
                    value={email}
                    onChange={e =>onChange(e)}
                    placeholder='Email'
                    required 
                />
            </div>
            <div className='form-group'>
                <input 
                    className='form-control' 
                    type='text'
                    name='first_name'
                    value={first_name}
                    onChange={e =>onChange(e)}
                    placeholder='First Name'
                    required 
                />
            </div>
            <div className='form-group'>
                <input 
                    className='form-control' 
                    type='text'
                    name='last_name'
                    value={last_name}
                    onChange={e =>onChange(e)}
                    placeholder='Last Name'
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
                    onChange={e =>onChange(e)}
                    minLength='6'
                    required
                />
            </div>
            <div className='form-group'>
                <input
                    className='form-control'
                    type='password'
                    placeholder='re-password'
                    name='re_password'
                    value={re_password}
                    onChange={e =>onChange(e)}
                    minLength='6'
                    required
                />
            </div>
            {error && <div style={{ color: 'red'}}>{error}</div>}
            {/* {successMessage && <p>{successMessage}</p>} */}
            <button className='btn btn-primary' type='submit'>Login</button>
        </form>
        <button className='btn btn-danger mt-3' onClick={continueWithGoogle}>
            Continue With Google
        </button><br/>
        <button className='btn btn-primary mt-3' onClick={continueWithFacebook}>
            Continue With Facebook
        </button>
        <p className='mt-3'>
            Already have an account? <Link to='/login'>Sign In</Link>
        </p>
        </>
    </div>
  )
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signup })(Signup);