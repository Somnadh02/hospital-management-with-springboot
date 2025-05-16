import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ReceptionistView = () => {
  const [receptionists, setReceptionists] = useState([])

  const receptionistHandler = async () => {
    try {
      const response = await fetch('http://localhost:8080/receptionists/getAll') // Update API endpoint
      const data = await response.json()
      if (Array.isArray(data)) {
        setReceptionists(data)
      } else {
        setReceptionists([data])
      }
    } catch {
      setReceptionists([])
    }
  }

  useEffect(() => {
    receptionistHandler()
  }, [])

  const deleteReceptionist = async (id) => {
    const response = await fetch(`http://localhost:8080/receptionists/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      alert("Receptionist deleted successfully")
      receptionistHandler()
    } else {
      alert("Failed to delete")
    }
  }

  return (
    <div className='view'>
      <h2>Receptionist Details</h2>
      <table style={{ border: "2px solid black", marginTop: "20px" }} className='table'>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Contact</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {receptionists.map((user) => (
            <tr key={user.receptionist_id}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{user.name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{user.contact}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <button onClick={() => deleteReceptionist(user.receptionist_id)} className='delete-btn'>Delete</button>
                <Link to="/admin/managereceptionist/receptionistform" state={{ receptionist: user }}>
                  <button className='edit-btn'>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReceptionistView
