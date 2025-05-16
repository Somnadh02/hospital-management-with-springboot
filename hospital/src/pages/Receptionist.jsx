import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Receptionist = () => {
  const [isPatientDropdownOpen, setPatientDropdownOpen] = useState(false);
  const [isAppointmentDropdownOpen, setAppointmentDropdownOpen] = useState(false);
  const [isDoctorDropdownOpen, setDoctorDropdownOpen] = useState(false);

  const togglePatientDropdown = () => {
    setPatientDropdownOpen(!isPatientDropdownOpen);
  };

  const toggleAppointmentDropdown = () => {
    setAppointmentDropdownOpen(!isAppointmentDropdownOpen);
  };

  const toggleDoctorDropdown = () => {
    setDoctorDropdownOpen(!isDoctorDropdownOpen);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <nav style={sidebarStyles}>
        <ul style={ulStyles}>
          {/* Patient Management */}
          <li>
            <button 
              onClick={togglePatientDropdown} 
              style={dropdownButtonStyles}
            >
              Patient Management
            </button>
            {isPatientDropdownOpen && (
              <ul style={dropdownUlStyles}>
                <li style={dropdownLiStyles}>
                  <Link to='/receptionist/managepatient/patientform' style={linkStyles}>
                    Add Patient
                  </Link>
                </li>
                <li style={dropdownLiStyles}>
                  <Link to='/receptionist/managepatient/patientview' style={linkStyles}>
                    View Patients
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Appointment Management */}
          <li>
            <button 
              onClick={toggleAppointmentDropdown} 
              style={dropdownButtonStyles}
            >
              Appointment Management
            </button>
            {isAppointmentDropdownOpen && (
              <ul style={dropdownUlStyles}>
                <li style={dropdownLiStyles}>
                  <Link to='/receptionist/manageappointment/appointmentform' style={linkStyles}>
                    Add Appointment
                  </Link>
                </li>
                <li style={dropdownLiStyles}>
                  <Link to='/receptionist/manageappointment/appointmentview' style={linkStyles}>
                    View Appointments
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Doctor Management */}
          <li>
            <button 
              onClick={toggleDoctorDropdown} 
              style={dropdownButtonStyles}
            >
              Doctor Management
            </button>
            {isDoctorDropdownOpen && (
              <ul style={dropdownUlStyles}>
                
                <li style={dropdownLiStyles}>
                  <Link to='/receptionist/managedoctor/doctorview' style={linkStyles}>
                    View Doctors
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div style={mainContentStyles}>
        {/* Content will be rendered based on the routes */}
        <Outlet />
      </div>
    </div>
  );
};

// Styles
const sidebarStyles = {
  width: '250px',
  backgroundColor: '#6a0dad',
  padding: '20px',
  color: '#ecf0f1',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
};

const ulStyles = {
  listStyleType: 'none',
  padding: 0,
};

const dropdownButtonStyles = {
  background: 'none',
  border: 'none',
  color: '#ecf0f1',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'left',
  padding: '10px 0',
};

const dropdownUlStyles = {
  listStyleType: 'none',
  paddingLeft: '20px',
  marginTop: '10px',
};

const dropdownLiStyles = {
  marginBottom: '10px',
};

const linkStyles = {
  textDecoration: 'none',
  color: '#ecf0f1',
  fontSize: '16px',
  transition: 'color 0.3s',
};

const mainContentStyles = {
  flex: 1,
  padding: '20px',
  backgroundColor: '#ecf0f1',
};



export default Receptionist;
