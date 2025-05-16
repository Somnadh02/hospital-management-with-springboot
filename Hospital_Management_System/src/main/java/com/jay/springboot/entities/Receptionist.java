package com.jay.springboot.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "receptionists")
public class Receptionist {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int receptionist_id;
	@Column(nullable = false)
    private String name;
	@Column(nullable = false,unique = true)
    private String contact;
	
	public int getReceptionist_id() {
		return receptionist_id;
	}
	public void setReceptionist_id(int receptionist_id) {
		this.receptionist_id = receptionist_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	
	
}
