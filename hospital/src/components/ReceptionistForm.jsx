import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReceptionistForm = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const receptionist = location.state?.receptionist || null;

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (receptionist) {
      setName(receptionist.name);
      setContact(receptionist.contact);
    }
  }, [receptionist]);

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      newErrors.name = 'Name should contain only alphabets';
    }

    if (!contact.trim()) {
      newErrors.contact = 'Contact is required';
    } else if (!/^\d{10}$/.test(contact)) {
      newErrors.contact = 'Contact should be a 10-digit number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReceptionist = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newReceptionist = {
      name: name,
      contact: contact
    };

    if (receptionist) {
      const response = await fetch(`http://localhost:8080/receptionists/update/${receptionist.receptionist_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReceptionist)
      });
      if (response.ok) {
        alert("Receptionist updated successfully");
        navigation('/admin/managereceptionist/receptionistview');
      } else {
        alert("Failed to update receptionist");
      }
    } else {
      const response = await fetch("http://localhost:8080/receptionists/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReceptionist)
      });
      if (response.ok) {
        alert("Receptionist added successfully");
        setName('');
        setContact('');
      } else {
        alert("Failed to add receptionist");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleReceptionist} className='form'>
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
          <div className='contact'>
            <label>Contact:</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
            {errors.contact && <span className="error">{errors.contact}</span>}
          </div>
        </div>
        <div className='button'>
          <button type="submit">{receptionist ? 'Update' : 'Add'}</button>
        </div>
      </form>
    </div>
  );
};

export default ReceptionistForm;
