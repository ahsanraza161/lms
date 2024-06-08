import '../../mainadmin.css';
import * as React from 'react';
import { CgProfile } from 'react-icons/cg';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AuthContext from '../../../../context/auth/authcontext';
import { useNavigate } from 'react-router-dom';

function Topbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { LogoutUser } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    const LogoutHandler = () => {
      LogoutUser('isAdminAuthenticated');
      navigate('/');
    };

  return (
    <div className="topBar">
      <h3>Learning Managment System</h3>
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
            '& .MuiAvatar-root': {
              width: 50,
              height: 50,
              marginLeft: '10px',
            },
          }}
        >
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
        <MenuItem onClick={LogoutHandler}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default Topbar;
