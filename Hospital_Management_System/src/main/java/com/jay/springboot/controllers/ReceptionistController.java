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

import com.jay.springboot.entities.Receptionist;
import com.jay.springboot.services.ReceptionistService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/receptionists")
public class ReceptionistController {
	
	@Autowired
	private ReceptionistService rs;
	
	@PostMapping("/add")
	public String addReceptionist(@RequestBody Receptionist r) {
		rs.saveReceptionist(r);
		return "new receptionist added successfully";
	}
	
	@GetMapping("/getAll")
	public List<Receptionist> getAllReceptionists(){
		return rs.getAll();
	}
	
	@GetMapping("{id}")
	public Optional<Receptionist> getRceptionistById(@PathVariable int id){
		return rs.getById(id);
	}
	
	@PutMapping("/update/{id}")
	public String updateRceptionist(@PathVariable int id,@RequestBody Receptionist r) {
		Receptionist updated=rs.update(id, r);
		if(updated!=null) {
			return"receptionist updated sucessfully";
		}
		else {
			return"no receptionist found";
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteReceptionist(@PathVariable int id) {
		boolean deleted=rs.delete(id);
		if(deleted) {
			return "deleted sucessfully";
		}
		else {
			return"no receptionist found";
		}
	}

}
