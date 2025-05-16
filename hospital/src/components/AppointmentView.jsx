import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './view.css';
const AppointmentView = ({role}) => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:8080/appointments/getAll');
      const data = await response.json();
      if (Array.isArray(data)) {
        setAppointments(data);
      } else {
        setAppointments([data]);
      }
    } catch {
      setAppointments([]);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const deleteAppointment = async (id) => {
    const response = await fetch(`http://localhost:8080/appointments/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      alert('Appointment deleted successfully');
      fetchAppointments();
    } else {
      alert('Failed to delete appointment');
    }
  };

  return (
    <div className='view'>
      <h2>Appointment Details</h2>
      <table style={{ border: '2px solid black', marginTop: '20px' }} className='table'>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Doctor ID</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Patient ID</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Time</th>
            {role==="admin"&&(<th style={{ border: '1px solid black', padding: '8px' }}>Action</th>)}
            {role==="receptionist"&&(<th style={{ border: '1px solid black', padding: '8px' }}>Action</th>)}
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.appointment_id}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.doctor_id}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.patient_id}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.date}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{appointment.time}</td>
              {role==="admin"&&(<td style={{ border: '1px solid black', padding: '8px' }}>
                {role==="admin"&&(<button onClick={() => deleteAppointment(appointment.appointment_id)} className="delete-btn">
                  Delete
                </button>)}
                {role===""&&(<button onClick={() => deleteAppointment(appointment.appointment_id)} className="delete-btn">
                  Delete
                </button>)}
                {role==="admin"&&(<Link to="/admin/manageappointment/appointmentform" state={{ appointment }}>
                  <button className="edit-btn">Edit</button>
                </Link>)}
                {role==="receptionist"&&(<Link to="/receptionist/manageappointment/appointmentform" state={{ appointment }}>
                  <button className="edit-btn">Edit</button>
                </Link>)}
              </td>)}
              {role==="receptionist"&&(<td style={{ border: '1px solid black', padding: '8px' }}>
                {role==="receptionist"&&(<button onClick={() => deleteAppointment(appointment.appointment_id)} className="delete-btn">
                  Delete
                </button>)}
                {role===""&&(<button onClick={() => deleteAppointment(appointment.appointment_id)} className="delete-btn">
                  Delete
                </button>)}
                {role==="admin"&&(<Link to="/admin/manageappointment/appointmentform" state={{ appointment }}>
                  <button className="edit-btn">Edit</button>
                </Link>)}
                {role==="receptionist"&&(<Link to="/receptionist/manageappointment/appointmentform" state={{ appointment }}>
                  <button className="edit-btn">Edit</button>
                </Link>)}
              </td>)}
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentView;
