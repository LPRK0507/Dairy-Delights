import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Box, Alert, Button } from '@mui/material';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders from the API (your db.json file hosted by json-server)
    axios
      .get('http://localhost:3001/orders') // Replace with your API endpoint
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load orders. Please try again later.');
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this effect runs once when the component mounts.

  const handleLogout = () => {
    // Close the current tab and redirect to home page
    window.location.href = '/home';  // Redirect to home page
    window.close();  // Close the current tab
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: 'rgb(193, 234, 240)' }}>
      <Typography variant="h4" gutterBottom style={{ color: 'darkblue', fontStyle: 'italic', fontWeight: 'bold' }}>
        Order Details
      </Typography>
      {orders.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Delivery Date</TableCell> {/* New column for Delivery Date */}
                <TableCell>Total Amount</TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.Name}</TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell>{order.item ? order.item.productName : 'N/A'}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.deliveryDate ? order.deliveryDate : 'N/A'}</TableCell> {/* Display Delivery Date */}
                  <TableCell>₹{order.totalAmount}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">No orders available.</Typography>
      )}
      
      {/* Logout Button */}
      <Box display="flex" justifyContent="center" marginTop="20px">
        <Button
          variant="contained"
          sx={{ backgroundColor: 'darkblue', '&:hover': { backgroundColor: 'blue' } }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </div>
  );
};

export default Order;
