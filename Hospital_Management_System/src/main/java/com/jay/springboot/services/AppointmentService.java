package com.jay.springboot.services;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jay.springboot.DTO.AppointmentDTO;
import com.jay.springboot.entities.Appointments;
import com.jay.springboot.entities.Doctor;
import com.jay.springboot.entities.Patient;
import com.jay.springboot.repositories.AppointmentRepository;
import com.jay.springboot.repositories.DoctorRepository;
import com.jay.springboot.repositories.PatientRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    // Method to create an appointment
    public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {
        Doctor doctor = doctorRepository.findById(appointmentDTO.getDoctor_id())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Patient patient = patientRepository.findById(appointmentDTO.getPatient_id())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Appointments appointment = new Appointments();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setDate(LocalDate.parse(appointmentDTO.getDate()));
        appointment.setTime(LocalTime.parse(appointmentDTO.getTime()));

        Appointments savedAppointment = appointmentRepository.save(appointment);

        return new AppointmentDTO(savedAppointment.getAppointment_id(),
                                  savedAppointment.getDoctor().getDoctor_id(),
                                  savedAppointment.getPatient().getPatient_id(),
                                  savedAppointment.getDate().toString(),
                                  savedAppointment.getTime().toString());
    }

    // Method to update an appointment
    public AppointmentDTO updateAppointment(int id, AppointmentDTO appointmentDTO) {
        Appointments appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        Doctor doctor = doctorRepository.findById(appointmentDTO.getDoctor_id())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Patient patient = patientRepository.findById(appointmentDTO.getPatient_id())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setDate(LocalDate.parse(appointmentDTO.getDate()));
        appointment.setTime(LocalTime.parse(appointmentDTO.getTime()));

        Appointments updatedAppointment = appointmentRepository.save(appointment);

        return new AppointmentDTO(updatedAppointment.getAppointment_id(),
                                  updatedAppointment.getDoctor().getDoctor_id(),
                                  updatedAppointment.getPatient().getPatient_id(),
                                  updatedAppointment.getDate().toString(),
                                  updatedAppointment.getTime().toString());
    }

    // Method to delete an appointment
    public void deleteAppointment(int id) {
        Appointments appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointmentRepository.delete(appointment);
    }

    // Method to fetch all appointments
    public List<AppointmentDTO> getAllAppointments() {
        List<Appointments> appointments = appointmentRepository.findAll();
        return appointments.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // Method to fetch appointment by ID
    public AppointmentDTO getAppointmentById(int id) {
        Appointments appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        return convertToDTO(appointment);
    }

    // Utility method to convert Appointment entity to AppointmentDTO
    private AppointmentDTO convertToDTO(Appointments appointment) {
        return new AppointmentDTO(appointment.getAppointment_id(),
                                  appointment.getDoctor().getDoctor_id(),
                                  appointment.getPatient().getPatient_id(),
                                  appointment.getDate().toString(),
                                  appointment.getTime().toString());
    }
}

