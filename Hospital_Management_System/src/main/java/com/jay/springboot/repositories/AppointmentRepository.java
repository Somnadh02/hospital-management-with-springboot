package com.jay.springboot.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jay.springboot.entities.Appointments;


@Repository
public interface AppointmentRepository  extends JpaRepository<Appointments, Integer>{

}
