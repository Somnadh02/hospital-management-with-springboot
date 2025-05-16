import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './form.css';

const PatientForm = ({ role }) => {
  const location = useLocation();
  const navigation = useNavigate();
  const patient = location.state?.patient || null;

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (patient) {
      setName(patient.name);
      setAge(patient.age);
      setGender(patient.gender);
      setMedicalHistory(patient.medicalHistory);
    }
  }, [patient]);

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      newErrors.name = 'Name should contain only alphabets';
    }

    if (!age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(age) || age < 1 || age > 120) {
      newErrors.age = 'Age should be a number between 1 and 120';
    }

    if (!gender) {
      newErrors.gender = 'Gender is required';
    }

    if (medicalHistory && medicalHistory.length > 200) {
      newErrors.medicalHistory = 'Medical history should not exceed 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePatient = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newPatient = {
      name: name,
      age: age,
      gender: gender,
      medicalHistory: medicalHistory,
    };

    if (patient) {
      const response = await fetch(`http://localhost:8080/patients/update/${patient.patient_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatient),
      });
      if (response.ok) {
        alert('Patient updated successfully');
        navigation(role === 'admin' ? '/admin/managepatient/patientview' : '/receptionist/managepatient/patientview');
      } else {
        alert('Failed to update patient');
      }
    } else {
      const response = await fetch("http://localhost:8080/patients/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatient),
      });
      if (response.ok) {
        alert('Added successfully');
        setName('');
        setAge('');
        setGender('');
        setMedicalHistory('');
      } else {
        alert('Failed to add patient');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handlePatient} className='form'>
        <div className="inputs">
          <div className='name'>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          
          <div className='age'>
            <label>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            {errors.age && <span className="error">{errors.age}</span>}
          </div>
          
          <div className='gender'>
            <label>Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>
          
          <div className='medicalhistory'>
            <label>Medical History:</label>
            <input
              type="text"
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
            />
            {errors.medicalHistory && <span className="error">{errors.medicalHistory}</span>}
          </div>
        </div>
        
        <div className='button'>
          <button type="submit">{patient ? 'Update' : 'Add'}</button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
