import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetConfirmPassword } from '../action/auth';

const ResetPasswordConfirm = ({ resetConfirmPassword }) => {
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: ''
  })
  const [requestSent, setRequestSent] = useState(false)
  const { uid, token } = useParams();
  const {new_password, re_new_password} = formData;
  const navigate = useNavigate();

  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const onSubmit = async e => {
    e.preventDefault();
    resetConfirmPassword(uid, token, new_password, re_new_password);
    setRequestSent(true);
  }

  if(requestSent){
    return navigate('/login');
  }

  return (
    <div className='container mt-5'>
      <h1> Change Your Password</h1>
      <form onSubmit={e=>onSubmit(e)}>
        <div className='form-group'>
          <input
            className='form-control'
            type='password'
            name='new_password'
            placeholder='password'
            value={new_password}
            onChange={e=>onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='password'
            name='re_new_password'
            placeholder='re_password'
            value={re_new_password}
            onChange={e=>onChange(e)}
            required
          />
        </div>
        <button className='btn btn-primary'>Confirm</button>
      </form>
    </div>
  )
}

export default connect(null, { resetConfirmPassword })(ResetPasswordConfirm);