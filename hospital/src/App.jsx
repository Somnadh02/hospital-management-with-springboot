import React from 'react'
import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin'
import Doctor from './pages/Doctor'
import Receptionist from './pages/Receptionist'
import LoginRegisterForm from './components/LoginRegisterForm'
import DoctorForm from './components/DoctorForm'
import DoctorView from './components/DoctorView'
import PatientForm from './components/PatientForm'
import PatientView from './components/PatientView'
import ReceptionistForm from './components/ReceptionistForm'
import ReceptionistView from './components/ReceptionistView'
import AppointmentForm from './components/AppointmentForm'
import AppointmentView from './components/AppointmentView'
import Header from './components/Header';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';

const App = () => {
  return (
    <div>
      
     <Header/>
   
      <Routes>
        
      <Route path='/' element={<Navigate to="/login" />} />
      <Route path='/login' element={<LoginRegisterForm />} />
      <Route path='/about' element={<AboutUs/>}/>
        {/* Admin Routes */}
        <Route path='/admin/*' element={<Admin />}>
          <Route path='managedoctor/doctorform' element={<DoctorForm />} />
          <Route path='managedoctor/doctorview' element={<DoctorView role="admin" />} />
          <Route path='managepatient/patientform' element={<PatientForm role="admin" />} />
          <Route path='managepatient/patientview' element={<PatientView role="admin" />} />
          <Route path='managereceptionist/receptionistform' element={<ReceptionistForm role="admin" />} />
          <Route path='managereceptionist/receptionistview' element={<ReceptionistView role="admin" />} />
          <Route path='manageappointment/appointmentform' element={<AppointmentForm role="admin" />} />
          <Route path='manageappointment/appointmentview' element={<AppointmentView role="admin" />} />
        </Route>

        {/* Receptionist Routes */}
        <Route path='/receptionist/*' element={<Receptionist />}>
          <Route path='managepatient/patientform' element={<PatientForm role="receptionist" />} />
          <Route path='managepatient/patientview' element={<PatientView role="receptionist" />} />
          <Route path='manageappointment/appointmentform' element={<AppointmentForm role="receptionist" />} />
          <Route path='manageappointment/appointmentview' element={<AppointmentView role="receptionist" />} />
          <Route path='managedoctor/doctorview' element={<DoctorView role="receptionist" />} />
        </Route>

        {/* Doctor Routes */}
        <Route path='/doctor/*' element={<Doctor />}>
          <Route path='manageappointment/appointmentview' element={<AppointmentView role="doctor" />} />
          <Route path='managepatient/patientview' element={<PatientView role="doctor" />} />
        </Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
