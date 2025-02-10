import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Grid,
  CardMedia,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Styled container for the form
const FormContainer = styled(Paper)`
  margin: 2rem auto;
  max-width: 1000px;
  padding: 2rem;
  border-radius: 8px;
  background: rgb(193, 234, 240);

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const OrderForm = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state for fetching item
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange", // This enables the validation as you type
  });

  const quantity = watch("quantity"); // Get the current quantity value

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/products/${id}`) // Correct URL for Axios request
      .then((response) => {
        setSelectedItem(response.data);
        setLoading(false);
        if (response.data && quantity) {
          calculateTotalAmount(response.data.price, quantity);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching product details:", error);
      });
  }, [id, quantity]);

  const calculateTotalAmount = (price, quantity) => {
    const amount = price * quantity;
    setTotalAmount(amount);
  };

  const onSubmit = async (data) => {
    try {
      const orderData = {
        ...data,
        item: selectedItem,
        totalAmount,
      };
      await axios.post("http://localhost:3001/orders", orderData);
      setSuccessMessage("Order placed successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/home");
      }, 1000);
    } catch (error) {
      setSuccessMessage("Failed to place the order. Try again.");
    }
  };

  if (loading) {
    return <CircularProgress style={{ marginTop: "20px" }} />;
  }

  if (!selectedItem) {
    return <Typography variant="h6">Product details not available.</Typography>;
  }

  return (
    <FormContainer elevation={3}>
      <Grid container spacing={3}>
        {/* Left Side - Image and Details */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            Order for {selectedItem.productName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Price: ₹{selectedItem.price}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Rating: {selectedItem.rating} ⭐
          </Typography>
          <CardMedia
            component="img"
            image={`../dairies/${selectedItem.image}`} // Ensure this path is correct
            alt={selectedItem.productName}
            style={{ borderRadius: 8, marginTop: "1rem" }}
          />
          <Typography variant="body1" style={{ marginTop: "1rem" }}>
            <b>Description:</b> {selectedItem.description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <b>Nutritional Value:</b> {selectedItem.nutritionalValue}
          </Typography>
          <Typography variant="body2" style={{ marginTop: "1rem" }}>
            <b>Delivery Info:</b> Every product we offer is freshly produced and crafted with care. As every farm operates with its own unique methods and natural variations, there might be slight differences in the product’s appearance and texture. Since dairy products are perishable in nature, we ensure timely delivery of your order. However, the delivery cannot be redirected to another address once dispatched.
          </Typography>

          {/* Storing Instructions Section */}
          <Typography variant="body2" style={{ marginTop: "1rem" }}>
            <b>Storing Instructions:</b> Milk and curd should be stored in a refrigerator at appropriate temperatures. Butter, cheese, and yogurt are best kept refrigerated to maintain their freshness. Store ghee and other clarified products in a cool, dry place. Use every product within a week.
          </Typography>
        </Grid>

        {/* Right Side - Form */}
        <Grid item xs={12} sm={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Customer Details */}
            <Controller
              name="Name"
              control={control}
              defaultValue=""
              rules={{
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z][A-Za-z\s]*$/,
                  message: "Name must contain only letters and spaces",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  error={!!errors.Name}
                  helperText={errors.Name?.message}
                  fullWidth
                  margin="normal"
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{
                required: "Phone number is required",
                pattern: { value: /^[789]\d{9}$/, message: "Invalid phone number" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  fullWidth
                  margin="normal"
                />
              )}
            />

            {/* Order Details */}
            <Controller
              name="deliveryDate"
              control={control}
              defaultValue=""
              rules={{
                required: "Delivery date is required",
                validate: (value) =>
                  new Date(value) >= new Date() || "Delivery date must be today or later",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Delivery Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.deliveryDate}
                  helperText={errors.deliveryDate?.message}
                  fullWidth
                  margin="normal"
                />
              )}
            />

            <Controller
              name="quantity"
              control={control}
              rules={{
                required: "Quantity is required",
                min: { value: 1, message: "Minimum quantity is 1" },
                max: { value: 20, message: "Maximum quantity is 20" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Quantity"
                  type="number"
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message}
                  fullWidth
                  margin="normal"
                  onChange={(e) => {
                    field.onChange(e);
                    calculateTotalAmount(selectedItem.price, e.target.value);
                  }}
                />
              )}
            />

            {/* Address Details */}
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{ required: "Door no./Street name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Door no./Street Name"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  fullWidth
                  margin="normal"
                />
              )}
            />

            {/* City Field */}
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  fullWidth
                  margin="normal"
                />
              )}
            />

            {/* Zip Code Field */}
            <Controller
              name="zipCode"
              control={control}
              defaultValue=""
              rules={{
                required: "Zip code is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Zip code must be exactly 6 digits",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Zip Code"
                  error={!!errors.zipCode}
                  helperText={errors.zipCode?.message}
                  fullWidth
                  margin="normal"
                />
              )}
            />

            {/* Total Amount */}
            <Typography variant="body1" style={{ margin: "1rem 0" }}>
              Total Amount: ₹{totalAmount}
            </Typography>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isValid} // Ensures button is disabled when form is invalid
            >
              Place Order
            </Button>
          </form>
        </Grid>
      </Grid>

      {/* Success Snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert
          onClose={() => setSuccessMessage("")}
          severity={successMessage.includes("successfully") ? "success" : "error"}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </FormContainer>
  );
};

export default OrderForm;
