import React from "react";
import "./Footer.css";

const Footer = () => {
  let date = new Date();
  let currentYear = date.getFullYear();

  return (
    <div className="footer">
      <p>
        Copyright © {currentYear} | Developed By <span>❤</span> Rabbani Khan
      </p>
    </div>
  );
};

export default Footer;
