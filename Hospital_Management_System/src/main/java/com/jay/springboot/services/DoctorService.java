package com.jay.springboot.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jay.springboot.entities.Doctor;
import com.jay.springboot.repositories.DoctorRepository;

@Service
public class DoctorService {
	
	@Autowired
	private DoctorRepository dr;
	
	//add doctor
	public Doctor saveDoctor(Doctor d) {
		return dr.save(d);
	}
	
	//get All doctors
	public List<Doctor> getAllDoctors(){
		return dr.findAll();
	}
	
	//get doctor by id
	public Optional<Doctor>getDoctorById(int id){
		if(dr.existsById(id)) {
			return dr.findById(id);
		}
		else {
			return null;
		}
	}
	
	//update doctor by id
	public Doctor updateDoctor(int id,Doctor d) {
		if(dr.existsById(id)) {
		     d.setDoctor_id(id);
			return dr.save(d);
		}
		return null;
	}
	
	//delete doctor by id
	public boolean deleteDoctor(int id) {
		if(dr.existsById(id)) {
			dr.deleteById(id);
			return true;
		}
		else {
			return false;
		}
		
	}

}
