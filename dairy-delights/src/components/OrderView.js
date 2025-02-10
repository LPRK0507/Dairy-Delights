import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home'); // Redirect to home or any desired page
  }, [navigate]);

  return null; // No UI to render
};

export default OrderView;
