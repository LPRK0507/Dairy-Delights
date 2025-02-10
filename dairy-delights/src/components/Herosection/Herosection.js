import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, Button, Card, CardContent, CardMedia, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Import Search icon
import { useNavigate } from "react-router-dom";

const HeroSection = ({ categoryFilter }) => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search query
  const navigate = useNavigate();

  // Fetch data from json-server
  useEffect(() => {
    axios
      .get("http://localhost:3001/products") // Ensure this matches your API
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching data:", error));

    // Add event listener for 'Enter' key press
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        scrollToImages();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup event listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [categoryFilter]); // Only re-fetch items when categoryFilter changes

  const scrollToImages = () => {
    const section = document.getElementById("images-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToForm = () => {
    const formSection = document.getElementById("order-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("Form section not found!");
    }
  };

  const handleImageClick = (id) => {
    navigate(`/order/${id}`);
    scrollToForm();
  };

  // Filter items by category and search query
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      categoryFilter === "" || item.category.toLowerCase().trim() === categoryFilter.toLowerCase().trim();
    const matchesSearch =
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="hero" style={{ position: "relative" }}>
      {/* Search Bar positioned at the right corner */}
      <div
        className="search-bar-container"
        style={{
          position: "absolute",
          top: "1px", // Adjusted for small gap from the top
          right: "50px", // Position it on the right corner
          zIndex: 1,
          padding: "5px",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background for readability
          borderRadius: "10px", // Optional: Rounded corners
          width: "250px", // Set a smaller width for the search bar
        }}
      >
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon /> {/* Magnifying glass icon */}
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* Background image section moved down */}
      <div
        className="hero-background"
        style={{
          backgroundImage: "url('/dairies/dairy.jpg')", // Set your image path here
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "105vh", // Full viewport height
          position: "absolute",
          top: "80px", // Adjusted to start below the search bar
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1, // Ensure it's behind the content
        }}
      ></div>

      {/* Hero section text */}
      <div className="hero-header" style={{ position: "relative", paddingTop: "150px" }}>
        <Grid container spacing={2} alignItems="center" sx={{ padding: "16px" }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" gutterBottom style={{ color: "white" }}>
              Mouth watering tastes!
            </Typography>
            <Typography variant="h5" component="h3" color="text.secondary" gutterBottom>
              "The best milk comes from cows that are well-cared for, and the best dairy products come from the heart of the farm."
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={scrollToImages}
              sx={{ marginTop: "16px" }}
            >
              Shop Now
            </Button>
          </Grid>
        </Grid>
      </div>

      {/* This section starts after the background image */}
      <div id="images-section" className="hero-container" style={{ marginTop: "300px" }}>
        <Grid container spacing={4} sx={{ padding: "16px" }}>
          {/* Display filtered items */}
          {filteredItems.map((item) => (
            <Grid item xs={6} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
                onClick={() => handleImageClick(item.id)}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.productName}
                  sx={{ height: 200 }}
                />
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ textAlign: "center", marginBottom: 1 }}>
                    {item.productName}
                  </Typography>
                  <Typography variant="h7" component="div" sx={{ textAlign: "center", marginBottom: 1 }}>
                    ({item.description})
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    ₹{item.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <hr />
    </section>
  );
};

export default HeroSection;
