import React, { useState, useContext } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Topbar from '../common/navbar/navbar';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import AuthContext from '../../context/auth/authcontext';
import "../../global.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { ForgetPassword } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await ForgetPassword(email);
      toast.success('Reset email sent successfully.');
    } catch (error) {
      toast.error('Email not found. Please enter a valid email.');
    }
  };
  const isFormValid = email !== '' && !loading;

  return (
    <>
      <Topbar />
      <div className="ForgetPass">
        <div className="one">
          <Form className='form' onSubmit={handleSubmit}>
            <LockOutlinedIcon className='icon' sx={{ bgcolor: 'secondary.main' }} />
            <Form.Group controlId="formGroupEmail">
              <h2 className='headingReset' >
                Forget Password
              </h2>
              <p className='notereset'>Reset Password Will be Sent to your Email Address So kindly put the valid address</p>
              <div className="resetInput">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button className='resetBtn' variant="primary" xs={12} sm={12} type="submit" disabled={!isFormValid}>
                  {loading ? 'Loading...' : 'Reset Password'}
                </Button>
              </div>
            </Form.Group>
          </Form>
          <div className='resetLink'>
            <div>
              <Button href="/login" variant="body2">
                Login
              </Button>
            </div>
            <div >
              <Button href="/registration" variant="body2">
                Create New Account
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Toaster/>
    </>
  );
};

export default ForgotPassword;
