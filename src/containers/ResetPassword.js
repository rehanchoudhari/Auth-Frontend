import React, { useState } from 'react';
import { resetPassword } from '../action/auth';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ResetPassword = ({ resetPassword }) => {
    const navigate = useNavigate();
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });
    const { email } = formData;

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();
        resetPassword(email);
        setRequestSent(true);
    }

    if(requestSent){
        return navigate('/')
    }

  return (
    <div className='container mt-5'>
        <h1>Reset Your Password</h1>
        <form onSubmit={e=>onSubmit(e)}>
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
            <button className='btn btn-primary' type='submit'>Reset</button>
        </form>
    </div>
  )
}

export default connect(null, { resetPassword })(ResetPassword);
