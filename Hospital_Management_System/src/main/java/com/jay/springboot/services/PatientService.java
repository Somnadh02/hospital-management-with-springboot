package com.jay.springboot.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jay.springboot.entities.Patient;
import com.jay.springboot.repositories.PatientRepository;

@Service
public class PatientService {

	@Autowired
	private PatientRepository pr;
	
	//add
	
	public Patient savePatient(Patient p) {
		return pr.save(p);
	}
	
	//get all
	
	public List<Patient> getAllPatients(){
		return pr.findAll();
	}
	
	//get by id
	
	public Optional<Patient> getPatientById(int id){
		if(pr.existsById(id)) {
			return pr.findById(id);
		}
		else {
			return null;
		}
	}
	
	//update
	
	public Patient updatePatient(int id,Patient p) {
		if(pr.existsById(id)) {
			p.setPatient_id(id);
			return pr.save(p);
		}
		else {
			return null;
		}
	}
	
	//delete
	
	public boolean deletePatient(int id) {
		if(pr.existsById(id)) {
			pr.deleteById(id);
			return true;
		}
		else {
			return false;
		}
	}
}
