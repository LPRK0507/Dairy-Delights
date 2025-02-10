import React, { useState } from 'react';
import { Person}from '@mui/icons-material';
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const Header = ({ onCategoryClick }) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleOrderViewClick = () => {
    setLoginOpen(true); // Open login modal
  };

  const handleLoginSubmit = () => {
    if (password === 'admin123') {
      setLoginOpen(false); // Close the modal
      window.open('/orders', '_blank'); // Open the orders page in a new tab
    } else {
      setError('Invalid Password.');
    }
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
    setPassword('');
    setError('');
  };

  return (
    <>
      <header style={headerStyle}>
        <div style={headerContentStyle}>
          <figure style={logoTextStyle}>
            <div style={logoContainerStyle}>
              <img
                src="/dairies/logo_dairy.png"
                alt="Logo"
                style={logoImageStyle}
              />
            </div>
            <div>
              <h1 style={logoTitleStyle}>Dairy Delight!</h1>
              <h3 style={logoSubtitleStyle}>
                "Nurturing nature, one drop at a time."
              </h3>
            </div>
          </figure>
          <div style={iconContainerStyle}>
            {/* Orders Icon */}
            <IconButton color="inherit" aria-label="orders" onClick={handleOrderViewClick}>
              <Person />
            </IconButton>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <Dialog open={loginOpen} onClose={handleLoginClose}>
        <DialogTitle>Login to View Orders</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleLoginSubmit} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Inline Styles
const headerStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 20px',
  backgroundColor: '#f8f8f8',
};

const headerContentStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const logoTextStyle = {
  display: 'flex',
  alignItems: 'center',
};

const logoContainerStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  overflow: 'hidden',
  marginRight: '10px',
};

const logoImageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const logoTitleStyle = {
  margin: 0,
  fontSize: '2.5rem',
  color: 'darkblue',
  fontStyle: 'italic',
};

const logoSubtitleStyle = {
  margin: 0,
  fontSize: '1.2rem',
  color: 'black',
};

const iconContainerStyle = {
  display: 'flex',
  gap: '10px',
  color: 'gray',
};

export default Header;
