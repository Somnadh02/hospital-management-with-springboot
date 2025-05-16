import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './form.css';

const DoctorForm = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const doctor = location.state?.doctor || null;

  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [contact, setContact] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (doctor) {
      setName(doctor.name);
      setSpecialization(doctor.specialization);
      setContact(doctor.contact);
    }
  }, [doctor]);
  const validateForm = () => {
    const newErrors = {};
  
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      newErrors.name = 'Name should contain only alphabets';
    }
  
    if (!specialization.trim()) {
      newErrors.specialization = 'Specialization is required';
    } else if (!/^[a-zA-Z\s]+$/.test(specialization)) {
      newErrors.specialization = 'Specialization should contain only alphabets';
    }
  
    if (!contact.trim()) {
      newErrors.contact = 'Contact is required';
    } else if (!/^\d{10}$/.test(contact)) {
      newErrors.contact = 'Contact should be a 10-digit number';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleDoctor = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newDoctor = {
      name: name,
      specialization: specialization,
      contact: contact,
    };

    if (doctor) {
      const response = await fetch(`http://localhost:8080/doctors/update/${doctor.doctor_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDoctor),
      });
      if (response.ok) {
        alert('Doctor updated successfully');
        navigation('/admin/managedoctor/doctorview');
      } else {
        alert('Failed to update doctor');
      }
    } else {
      const response = await fetch("http://localhost:8080/doctors/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDoctor),
      });
      const data = await response.json();
      console.log('New doctor added', data);

      alert('Added successfully');
      setName('');
      setSpecialization('');
      setContact('');
    }
  };

  return (
    <div>
      <form onSubmit={handleDoctor} className='form'>
        <div className="inputs">
          <div className='name'>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className='specialization'>
            <label>Specialization:</label>
            <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
            {errors.specialization && <p className="error">{errors.specialization}</p>}
          </div>
          <div className='contact'>
            <label>Contact:</label>
            <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
            {errors.contact && <p className="error">{errors.contact}</p>}
          </div>
        </div>
        
        <div className='button'>
          <button type="submit">{doctor ? 'Update' : 'Add'}</button>
        </div>
      </form>
    </div>
  );
};

export default DoctorForm;
