import React from "react";

export default function Footer() {
  const footerStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
    padding: "20px",
    backgroundColor: "#28282b",
    color: "whitesmoke",
  };

  const sectionStyle = {
    flex: 1,
    textAlign: "center",
  };

  const listStyle = {
    listStyle: "none",
    padding: 0,
  };

  const iconStyle = {
    fontSize: "24px",
    margin: "0 10px",
    color: "lightblue",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <div style={footerStyle}>
      <div style={sectionStyle}>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          <i className="fab fa-facebook-f" style={iconStyle}></i>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          <i className="fab fa-instagram" style={iconStyle}></i>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          <i className="fab fa-linkedin" style={iconStyle}></i>
        </a>
        <p>
          &copy; 2024 <span style={{ fontWeight: "bold" }}>Dairy Delights</span>{" "}
          <br />
          All rights reserved.
        </p>
      </div>

      <div style={sectionStyle}>
        <ul style={listStyle}>
          <li>
            <b>Know Us</b>
          </li>
          <li>Contact Us</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <ul style={listStyle}>
          <li>
            <b>Need Help</b>
          </li>
          <li>FAQ</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>
    </div>
  );
}
