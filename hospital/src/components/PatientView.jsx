import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './view.css'
const PatientView = ({role}) => {
  const[patient,setPatient]=useState([])

  const patientHandler=async()=>{
        try{
          const response=await fetch('http://localhost:8080/patients/getAll')
          const data=await response.json()
          if(Array.isArray(data)){
            setPatient(data)
          }
          else{
            setPatient([data])
          }
        }
        catch{
             setPatient([])
        }
          
  }
  useEffect(()=>{
    patientHandler();
  },[])

  const deletePatient=async(id)=>{
    const response=await fetch(`http://localhost:8080/patients/delete/${id}`,{
       method:'DELETE',
       headers: {
           'Content-Type': 'application/json'
       }
    })
    if(response.ok){
       alert("patient Deleted successfully")
      patientHandler();
    }
    else{
       alert("failed to delete")
    }
}
  return (
    <div className='view'>
      <h2>patient details</h2>
      <table style={{ border: "2px solid black", marginTop: "20px" }} className='table'>
                <thead>
                    <tr>
                    <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Age</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Gender</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>MedicalHistory</th>
                        {role==="admin"&&(<th style={{ border: '1px solid black', padding: '8px' }}>Action</th>)}
                            {role==="receptionist"&&(<th style={{ border: '1px solid black', padding: '8px' }}>Action</th>)}
                    </tr>
                </thead>
                <tbody>
                    {patient.map((user) => (
                        <tr key={user.patient_id}>
                          <td style={{ border: '1px solid black', padding: '8px' }}>{user.patient_id}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{user.name}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{user.age}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{user.gender}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{user.medicalHistory}</td>
                           {role==="admin"&&( <td style={{ border: '1px solid black', padding: '8px' }}>
                                <button onClick={()=>deletePatient(user.patient_id)} className='delete-btn'>Delete</button>
                                {role==="admin"&&(<Link
                                 to="/admin/managepatient/patientform" state={{patient:user}}>
                                 <button className='edit-btn'>Edit</button>
                                </Link>)}
                                {role==="receptionist"&&(<Link
                                 to="/receptionist/managepatient/patientform" state={{patient:user}}>
                                 <button className='edit-btn'>Edit</button>
                                </Link>)}
                            </td>)}
                            {role==="receptionist"&&( <td style={{ border: '1px solid black', padding: '8px' }}>
                                <button onClick={()=>deletePatient(user.patient_id)} className='delete-btn'>Delete</button>
                                {role==="admin"&&(<Link
                                 to="/admin/managepatient/patientform" state={{patient:user}}>
                                 <button className='edit-btn'>Edit</button>
                                </Link>)}
                                {role==="receptionist"&&(<Link
                                 to="/receptionist/managepatient/patientform" state={{patient:user}}>
                                 <button className='edit-btn'>Edit</button>
                                </Link>)}
                            </td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  )
}

export default PatientView
