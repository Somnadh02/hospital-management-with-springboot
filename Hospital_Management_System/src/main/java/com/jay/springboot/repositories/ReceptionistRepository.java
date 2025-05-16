package com.jay.springboot.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jay.springboot.entities.Receptionist;

@Repository
public interface ReceptionistRepository extends JpaRepository<Receptionist, Integer> {

}
