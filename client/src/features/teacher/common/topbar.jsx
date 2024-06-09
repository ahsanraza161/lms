import '../../admin/mainadmin.css';
import { CgProfile } from 'react-icons/cg';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AuthContext from '../../../context/auth/authcontext';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

function Topbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { data, LogoutUser } = useContext(AuthContext);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const LogoutHandler = () => {
    LogoutUser('isStudentAuthenticated');
    navigate('/');
  };

  return (
    <div className="topBar">
      <h3>Learning Management System</h3>
      <div
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
        }}
      >
        <Button
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
          startIcon={<KeyboardArrowDownIcon />}
          sx={{
            // Using the 'sx' prop for styling
            '& .MuiAvatar-root': {
              width: 50,
              height: 50,
              marginLeft: '10px',
            },
          }}
        >
          {data && data.name ? data.name : ''}
          <CgProfile className="avatar" />
        </Button>
      </div>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={LogoutHandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default Topbar;
