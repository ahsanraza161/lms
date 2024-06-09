import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Topbar from '../common/navbar/navbar';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import AuthContext from '../../context/auth/authcontext';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { ResetPassword } = useContext(AuthContext);

  useEffect(() => {
    setIsFormValid(password !== '' && confirmPassword !== '' && password === confirmPassword);
  }, [password, confirmPassword]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setIsLoading(true);
    try {
      await ResetPassword(password, confirmPassword, token);
      toast.success("Password changed successfully");
      window.location.href = 'https://kit-lms.vercel.app/login';
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Topbar/>
      <div className='container App-main-all'>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h2 className="mt-2 mb-5 text-center">Reset Password</h2>
            <Form onSubmit={handleResetPassword} className="mt-3">
              <Form.Group controlId="password">
                <Form.Label className='text-center mb-3'>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label className='text-center mt-4 mb-3'>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button className='mt-5 w-100' variant="primary" type="submit" disabled={!isFormValid || isLoading}>
                {isLoading ? 'Working...' : 'Reset Password'}
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
      <Toaster />
    </>
  );
};

export default ResetPassword;
