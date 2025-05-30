package com.jay.springboot.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jay.springboot.entities.Doctor;
@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

}
