package com.jay.springboot.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jay.springboot.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	Optional<User>findByEmail(String email);

}
