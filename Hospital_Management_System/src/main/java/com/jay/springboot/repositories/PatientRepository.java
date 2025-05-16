package com.jay.springboot.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jay.springboot.entities.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {

}
