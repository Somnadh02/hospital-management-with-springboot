package com.jay.springboot.DTO;

public class AppointmentDTO {

	private int appointment_id;
    private int doctor_id;
    private int patient_id;
    private String date;  
    private String time;
    
    public AppointmentDTO() {
    	
    }
    
	public AppointmentDTO(int appointment_id, int doctor_id, int patient_id, String date, String time) {
		super();
		this.appointment_id = appointment_id;
		this.doctor_id = doctor_id;
		this.patient_id = patient_id;
		this.date = date;
		this.time = time;
	}
	public int getAppointment_id() {
		return appointment_id;
	}
	public void setAppointment_id(int appointment_id) {
		this.appointment_id = appointment_id;
	}
	public int getDoctor_id() {
		return doctor_id;
	}
	public void setDoctor_id(int doctor_id) {
		this.doctor_id = doctor_id;
	}
	public int getPatient_id() {
		return patient_id;
	}
	public void setPatient_id(int patient_id) {
		this.patient_id = patient_id;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	} 
    
    
}
