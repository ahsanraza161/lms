import React, { useContext, useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthContext from '../../context/auth/authcontext';
import toast, { Toaster } from 'react-hot-toast';

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

const defaultTheme = createTheme();
const degrees = ['Masters', 'Bachelor', 'Intermediate', 'Matric', 'Other'];
const usertype = ['Student', 'Faculty'];

const subjects = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Economics',
  'Business Administration',
  'Law',
  'Medicine',
  'Other',
];

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const RegistrationForm = () => {
  const { RegisterHandler, message } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [formData, setFormData] = useState({
    usertype: '',
    name: '',
    fatherName: '',
    dateOfBirth: '',
    gender: '',
    cnic: '',
    address: '',
    qualification: '',
    subject: '',
    completionYear: '',
    universityCollege: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await RegisterHandler(formData);
    setLoading(false);
    setFormData({
      usertype: '',
      name: '',
      fatherName: '',
      dateOfBirth: '',
      gender: '',
      cnic: '',
      address: '',
      qualification: '',
      subject: '',
      completionYear: '',
      universityCollege: '',
      email: '',
      password: '',
    });
  };

  useEffect(() => {
    if (message !== null && message !== undefined) {
      toast.success(message);
    }
  }, [message]);

  // Check if all fields are filled
  const isFormValid =
    Object.values(formData).every((value) => value !== '') &&
    !Object.values(formData).includes(null);

  return (
    <>
      <header className="App-header">
        <Topbar />
      </header>
      <main className="App-main-all container">
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registration Form
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <FormControl variant="filled" required style={{ width: '100%' }}>
                    <InputLabel id="usertype-label">Register as a</InputLabel>
                    <Select
                      labelId="usertype-label"
                      name="usertype"
                      value={formData.usertype}
                      onChange={handleChange}
                    >
                      {usertype.map((usertype) => (
                        <MenuItem key={usertype} value={usertype}>
                          {usertype}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    style={{ width: '100%' }}
                    label="Name"
                    required
                    name="name"
                    sx={{ bgcolor: 'none', color: 'text.primary' }}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Father's Name"
                    style={{ width: '100%' }}
                    sx={{ bgcolor: 'none', color: 'text.primary' }}
                    required
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    style={{ width: '100%' }}
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    required
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl required>
                    <Typography component="heading" variant="h6">
                      Gender
                    </Typography>
                    <RadioGroup
                      row
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      {genders.map((gender) => (
                        <FormControlLabel
                          key={gender.value}
                          value={gender.value}
                          control={<Radio />}
                          label={gender.label}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="CNIC"
                    style={{ width: '100%' }}
                    required
                    name="cnic"
                    value={formData.cnic}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Address"
                    style={{ width: '100%' }}
                    required
                    multiline
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl variant="filled" required style={{ width: '100%' }}>
                    <InputLabel id="qualification-label">
                      Highest Qualification
                    </InputLabel>
                    <Select
                      labelId="qualification-label"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                    >
                      {degrees.map((degree) => (
                        <MenuItem key={degree} value={degree}>
                          {degree}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl variant="filled" style={{ width: '100%' }} required>
                    <InputLabel id="subject-label">
                      Subject of Studies
                    </InputLabel>
                    <Select
                      labelId="subject-label"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      {subjects.map((subject) => (
                        <MenuItem key={subject} value={subject}>
                          {subject}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="filled-basic"
                    label="Completion Year"
                    style={{ width: '100%' }}
                    required
                    type="number"
                    name="completionYear"
                    value={formData.completionYear}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="filled-basic"
                    label="University/College Name"
                    style={{ width: '100%' }}
                    required
                    name="universityCollege"
                    value={formData.universityCollege}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="filled-basic"
                    label="email"
                    style={{ width: '100%' }}
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                style={{ width: '100%' }}
                sx={{ mt: 2 }}
                disabled={!isFormValid || loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href='/login' variant="body2" >
                    Already have an account? Login
                    </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </ThemeProvider>
      </main>
      <Toaster />
    </>
  );
};

export default RegistrationForm;
