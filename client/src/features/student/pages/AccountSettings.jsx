// import React from 'react';
import './AccountSettings.css';
// import '../../../global.css';
// import { Button } from '@coreui/coreui';
import { useContext, useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
// import Topbar from '../common/navbar/navbar';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import AuthContext from '../../context/auth/authcontext';
// import toast, { Toaster } from 'react-hot-toast';

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import AuthContext from '../../../context/auth/authcontext';

const degrees = ['Masters', 'Bachelor', 'Intermediate', 'Matric', 'Other'];

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
const AccountSettings = () => {
  const [formData, setFormData] = useState({
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
  });
  const { GetUserData, data, UpdateUser } = useContext(AuthContext);
  useEffect(() => {
    GetUserData().then(() => {
      if (data) {
        setFormData({
          name: data.name,
          fatherName: data.fatherName,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          cnic: data.cnic,
          address: data.address,
          qualification: data.qualification,
          subject: data.subject,
          completionYear: data.completionYear,
          universityCollege: data.universityCollege,
          email: data.email,
        });
      }
    });
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    UpdateUser(formData);
  };
  return (
    <div className="accountSettings">
      <Typography component="h1" variant="h5">
        Account Settings
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <TextField
              label="CNIC"
              style={{ width: '100%' }}
              required
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
            <FormControl required style={{ width: '100%' }}>
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
          <Grid item xs={12} sm={6}>
            <FormControl style={{ width: '100%' }} required>
              <InputLabel id="subject-label">Subject of Studies</InputLabel>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
        </Grid>
        <Button
          type="submit"
          variant="contained"
          style={{ width: '20%' }}
          sx={{ mt: 2 }}
        >
          Save Changes
        </Button>
      </Box>{' '}
    </div>
  );
};

export default AccountSettings;
