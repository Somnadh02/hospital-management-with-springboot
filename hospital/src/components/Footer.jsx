import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-title">Medicare Hub</h2>
          <p className="footer-tagline">Your health, our priority</p>
        </div>

        <div className="footer-links">
          <a href="/about" className="footer-link">About Us</a>
          <a href="/services" className="footer-link">Services</a>
          <a href="/contact" className="footer-link">Contact Us</a>
        </div>

        <div className="footer-contact">
          <p>Phone: +1 234 567 890</p>
          <p>Email: support@medicarehub.com</p>
       
        </div>
      </div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} Medicare Hub. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
