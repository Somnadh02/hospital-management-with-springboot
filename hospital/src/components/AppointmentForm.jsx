import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './form.css';

const AppointmentForm = ({ role }) => {
  const [doctorId, setDoctorId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const appointment = location.state?.appointment || null;

  useEffect(() => {
    if (appointment) {
      setDoctorId(appointment.doctor_id);
      setPatientId(appointment.patient_id);
      setDate(appointment.date);
      setTime(appointment.time);
    }
  }, [appointment]);

  const validateForm = () => {
    const newErrors = {};
    const currentDate = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format

    if (!String(doctorId).trim()) {
      newErrors.doctorId = 'Doctor ID is required';
    } else if (!/^\d+$/.test(doctorId)) {
      newErrors.doctorId = 'Doctor ID should be a numeric value';
    }

    if (!String(patientId).trim()) {
      newErrors.patientId = 'Patient ID is required';
    } else if (!/^\d+$/.test(patientId)) {
      newErrors.patientId = 'Patient ID should be a numeric value';
    }

    if (!date) {
      newErrors.date = 'Date is required';
    } else if (date < currentDate) {
      newErrors.date = 'Date cannot be in the past';
    }

    if (!time) {
      newErrors.time = 'Time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAppointment = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newAppointment = {
      doctor_id: doctorId,
      patient_id: patientId,
      date: date,
      time: time
    };

    if (appointment) {
      const response = await fetch(`http://localhost:8080/appointments/update/${appointment.appointment_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAppointment)
      });

      if (response.ok) {
        alert('Appointment updated successfully');
        navigate(role === 'admin' ? '/admin/manageappointment/appointmentview' : '/receptionist/manageappointment/appointmentview');
      } else {
        alert('Failed to update appointment. Either patient ID or doctor ID does not exist');
      }
    } else {
      const response = await fetch('http://localhost:8080/appointments/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAppointment)
      });

      if (response.ok) {
        alert('Appointment added successfully');
        setDoctorId('');
        setPatientId('');
        setDate('');
        setTime('');
      } else {
        alert('Failed to add appointment. Either patient ID or doctor ID does not exist');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleAppointment} className='form'>
        <div className="inputs">
          <div>
            <label htmlFor="doctor_id">Doctor ID</label>
            <input
              type="text"
              id="doctor_id"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              required
            />
            {errors.doctorId && <span className="error">{errors.doctorId}</span>}
          </div>
          <div>
            <label htmlFor="patient_id">Patient ID</label>
            <input
              type="text"
              id="patient_id"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required
            />
            {errors.patientId && <span className="error">{errors.patientId}</span>}
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            {errors.date && <span className="error">{errors.date}</span>}
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
            {errors.time && <span className="error">{errors.time}</span>}
          </div>
        </div>
        <div className="button">
          <button type="submit">{appointment ? 'Update Appointment' : 'Add Appointment'}</button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
