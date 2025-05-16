package com.jay.springboot.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jay.springboot.entities.Receptionist;
import com.jay.springboot.repositories.ReceptionistRepository;

@Service
public class ReceptionistService {

	@Autowired
	private ReceptionistRepository rr;
	
	//add
	
	public Receptionist saveReceptionist(Receptionist r) {
		return rr.save(r);
	}
	
	//getAll
	
	public List<Receptionist> getAll(){
		return rr.findAll();
				
	}
	
	//get by id
	
	public Optional<Receptionist> getById(int id){
		if(rr.existsById(id)) {
			return rr.findById(id);
		}
		else {
			return null;
		}
	}
	
	//update
	
	public Receptionist update(int id,Receptionist r) {
		if(rr.existsById(id)) {
			r.setReceptionist_id(id);
			return rr.save(r);
		}
		else {
			return null;
		}
	}
	
	//delete
	
	public boolean delete(int id) {
		if(rr.existsById(id)) {
			rr.deleteById(id);
			return true;
		}
		else {
			return false;
		}
	}
	
	
}
