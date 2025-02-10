import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HeroSection from './components/Herosection/Herosection';
import Navbar from './components/NavBar/NavBar'; // Import Navbar
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import OrderForm from './components/OrderForm/OrderForm';
import Order from './components/Order/Order';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Fallback component for error boundaries
const FallbackComponent = ({ error, resetErrorBoundary }) => (
  <div role="alert" style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
    <h2>Something went wrong:</h2>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

const App = () => {
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
  };

  return (
    <Router>
      <div className="App">
        <ErrorBoundary FallbackComponent={FallbackComponent}>
          <Header onCategoryClick={handleCategoryChange} />
          {/* Insert Navbar component here */}
          <Navbar onCategoryClick={handleCategoryChange} />
          <Routes>
            <Route
              path="/"
              element={<HeroSection categoryFilter={categoryFilter} />}
            />
            <Route path="/order/:id" element={<OrderForm />} />
            <Route path="/orders" element={<Order />} />
            {/* Add a fallback route in case no match */}
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
          <Footer />
        </ErrorBoundary>
      </div>
    </Router>
  );
};

export default App;
