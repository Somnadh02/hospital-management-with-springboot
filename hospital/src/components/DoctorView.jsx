import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import{Link} from 'react-router-dom'
import './view.css';

const DoctorView = ({role}) => {
  const[doctor,setDoctor]=useState([])

  const doctHandler = async () => {
    try {
      const response = await fetch('http://localhost:8080/doctors/getAll')
      const data = await response.json()  // Ensure to await the response
      if (Array.isArray(data)) {  // Check if the response is an array
        setDoctor(data)
      } else {
        console.error('Expected an array but got', data)
        setDoctor([])  // In case of an invalid response, reset to empty
      }
    } catch (error) {
      console.error("Error fetching doctor data", error)
      setDoctor([])  // Handle any errors by resetting the data
    }
  }
  useEffect(()=>{
        doctHandler();
  },[])
  const deleteDoct=async(id)=>{
    const response=await fetch(`http://localhost:8080/doctors/delete/${id}`,{
       method:'DELETE',
       headers: {
           'Content-Type': 'application/json'
       }
    })
    if(response.ok){
       alert("Doctor Deleted successfully")
       doctHandler();
    }
    else{
       alert("failed to delete")
    }
}
  return (
    <div className='view' >
      <h2 >Doctor details</h2>
      <table style={{ border: "2px solid black", marginTop: "20px" }} className='table'>
                <thead>
                    <tr>
                    <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>specialization</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Contact</th>
                       {role==="admin" &&( <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>)}
                    </tr>
                </thead>
                <tbody>
                    {doctor.map((user) => (
                        <tr key={user.doctor_id}>
                           <td style={{ border: '1px solid black', padding: '8px' }}>{user.doctor_id}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{user.name}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{user.specialization}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{user.contact}</td>
                            {role==="admin"&&(<td style={{ border: '1px solid black', padding: '8px' }}>
                                <button onClick={()=>deleteDoct(user.doctor_id)} className='delete-btn'>Delete</button>
                                <Link to="/admin/managedoctor/doctorform" state={{doctor:user}}>
                                 <button className='edit-btn'>Edit</button>
                                </Link>
                            </td>)}
                            
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  )
}

export default DoctorView
