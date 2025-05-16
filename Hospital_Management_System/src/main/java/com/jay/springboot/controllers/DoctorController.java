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

import com.jay.springboot.entities.Doctor;
import com.jay.springboot.services.DoctorService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/doctors")
public class DoctorController {
	
	@Autowired
	private DoctorService ds;
	
	@PostMapping("/add")
	public String addDoctor(@RequestBody Doctor d) {
		ds.saveDoctor(d);
		return "new doctor added successfully";
	}
	
	@GetMapping("/getAll")
	public List<Doctor> getAllDoctors(){
		return ds.getAllDoctors();
	}
	
	@GetMapping("{id}")
	public Optional<Doctor> getDoctorById(@PathVariable int id){
		return ds.getDoctorById(id);
	}
	
	@PutMapping("update/{id}")
	public String updateDoctorById(@PathVariable int id,@RequestBody Doctor d) {
		Doctor updated=ds.updateDoctor(id, d);
		if(updated!=null) {
			return "doctor updated sucessfully";
		}
		else {
			return"doctor not found";
		}
	}
	
	@DeleteMapping("delete/{id}")
	public String deleteDoctorById(@PathVariable int id) {
	     boolean isDeleted=ds.deleteDoctor(id);
		if(isDeleted) {
			return "deleted sucessfully";
		}
		else {
			return"doctor not found";
		}
	}

}
