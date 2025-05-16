import React from 'react';
import './AboutUs.css';
/* import teamImage1 from './images/team1.jpg'; // Sample images
import teamImage2 from './images/team2.jpg';
import techImage from './images/techStack.jpg'; */

const AboutUs = () => {
  return (
    <div className="about-us">
      {/* Intro Section */}
      <section className="intro-section">
        <h1 className="intro-heading">About Our Hospital Management System</h1>
        <p className="intro-description">
          Our Hospital Management System aims to enhance healthcare services through seamless technology. We are dedicated to providing a user-friendly, efficient, and secure platform for managing healthcare operations.
        </p>
      </section>

      {/* Mission, Vision, and Values */}
      <section className="values-section">
        <h2>Our Mission, Vision, and Values</h2>
        <div className="cards">
          <div className="card">
            <h3>Mission</h3>
            <p>To simplify healthcare management, improve efficiency, and ensure patient satisfaction.</p>
          </div>
          <div className="card">
            <h3>Vision</h3>
            <p>Empowering healthcare providers with advanced solutions to serve their communities better.</p>
          </div>
          <div className="card">
            <h3>Values</h3>
            <p>We prioritize quality, integrity, innovation, and patient-centered care in everything we do.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-cards">
          <div className="team-card">
            {/* <img src={teamImage1} alt="Team Member 1" /> */}
            <h3>Dr. Sarah Williams</h3>
            <p>Chief Medical Officer</p>
          </div>
          <div className="team-card">
           {/*  <img src={teamImage2} alt="Team Member 2" /> */}
            <h3>Mr. John Doe</h3>
            <p>Lead Developer</p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      {/* <section className="tech-stack">
        <h2>Technology Stack</h2>
        <div className="tech-icons">
          <img src={techImage} alt="Technology Stack" />
        </div>
      </section> */}

      {/* Contact Information */}
      <section className="contact-info">
        <h2>Contact Us</h2>
        <p>For any inquiries, please reach out at:</p>
        <p>Email: contact@hospitalmanagement.com</p>
        <p>Phone: +1 (123) 456-7890</p>
      </section>
    </div>
  );
};

export default AboutUs;
