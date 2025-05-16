package com.jay.springboot.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jay.springboot.entities.Patient;
import com.jay.springboot.services.PatientService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/patients")
public class PatientController {
	@Autowired
	private PatientService ps;
	
	@PostMapping("/add")
	public String addPatient(@RequestBody Patient p) {
		ps.savePatient(p);
		return "Patient added successfully";
	}
	
	@GetMapping("/getAll")
	public List<Patient> getAllPatients(){
		return ps.getAllPatients();
	}
	
	@GetMapping("/{id}")
	public Optional<Patient> getPatientById(@PathVariable int id){
		return ps.getPatientById(id);
	}
	
	@PutMapping("/update/{id}")
	public String updatePatientById(@PathVariable int id,@RequestBody Patient p) {
		Patient updated=ps.updatePatient(id, p);
		if(updated!=null) {
			return "Patient updated sucessfully";
		}
		else {
			return"patient not found";
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public String deletePatientByID(@PathVariable int id) {
		boolean isdeleted=ps.deletePatient(id);
		if(isdeleted) {
			return"patient delted sucessfully";
		}
		else {
			return"patient not found";
		}
	}

}
