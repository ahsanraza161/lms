// import { React, useContext, useEffect, useReducer, useState } from 'react';
import { React, useContext, useEffect, useState } from 'react';

import Topbar from '../common/navbar/navbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthContext from '../../context/auth/authcontext';
import Authreducer from '../../context/auth/authreducer';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// import  axios from 'axios';

const defaultTheme = createTheme();
const SignIn = () => {
  // const [state, dispatch] = useReducer(Authreducer, initstate);

  const {
    LoginHandler,
    error,
    isStudentAuthenticated,
    // GetUserData,
    isTeacherAuthenticated,
    isAdminAuthenticated,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // State to track loading

  const handleChange = (e) => {
    setFormData((prevdata) => {
      return { ...prevdata, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFormData((prevdata) => {
      return { email: '', password: '' };
    });
    await LoginHandler(formData);
    setLoading(false);
  };

  useEffect(() => {
    if (error !== null && error !== undefined) {
      toast.error(error);
    }

    if (isAdminAuthenticated) {
      navigate('/dashboard');
    }
    if (isStudentAuthenticated) {
      navigate('/user/allnotes');
    }
    if (isTeacherAuthenticated) {
      navigate('/teacher/allnotes');
    }
  }, [
    error,
    isStudentAuthenticated,
    isTeacherAuthenticated,
    isAdminAuthenticated,
  ]);

  return (
    <>
      <Topbar />
      <div>
        <div className="App-main-all">
          <Container>
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar
                sx={{ m: 1, alignItems: 'center', bgcolor: 'secondary.main' }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log In
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={loading} // Disable button when loading
                >
                  {loading ? 'Loading...' : 'Log in'} {/* Show loading text */}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/forgetpassword" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/registration" variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default SignIn;
