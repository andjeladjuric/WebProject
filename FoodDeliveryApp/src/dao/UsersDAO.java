package dao;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Role;
import beans.Type;
import beans.User;
import dto.SignupDTO;

public class UsersDAO {
	
	private LinkedHashMap<String, User> users;
	private String path = "C:\\Users\\jovic\\Desktop\\WebProject\\FoodDeliveryApp\\src\\files\\users.json";
	
	public UsersDAO() {
		users = new LinkedHashMap<String, User>();
	}
	
	public void serialize() {
		List<User> allUsers = new ArrayList<User>();
		
		for (User u : users.values()) {
			allUsers.add(u);
		}

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			// Write them to the file
			objectMapper.writeValue(new FileOutputStream(this.path), allUsers);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void load() {
		ObjectMapper mapper = new ObjectMapper();
	    
	    List<User> usersList = new ArrayList<User>();
	    
	    try {
	    	usersList = Arrays.asList(mapper.readValue(Paths.get(path).toFile(), User[].class));

	    } catch (Exception ex) {
	        ex.printStackTrace();
	    }
	    
	    for (User u : usersList) {
			users.put(u.getUsername(), u);
		}
	}
	
	public User getByUsername(String username) {
		if (users.containsKey(username)) {
			return users.get(username);
		}

		return null;
	}
	
	public void addNewUser(SignupDTO newUser) {
		User createdUser = new User(newUser.username, newUser.password, newUser.name, newUser.surname,
				newUser.gender, newUser.dateOfBirth, Role.CUSTOMER);
		users.put(createdUser.getUsername(), createdUser);
		serialize();
	}

	
	public boolean alreadyExists(String username) {
		return users.containsKey(username);
	}
	
	public List<User> getCustomers() {
		List<User> customers = new ArrayList<User>();
		
		for (User u : users.values()) {
			if(u.getRole() == Role.CUSTOMER)
				customers.add(u);
		}
		return customers;
	}
	
	public List<User> getManagers() {
		List<User> managers = new ArrayList<User>();
		
		for (User u : users.values()) {
			if(u.getRole() == Role.MANAGER)
				managers.add(u);
		}
		return managers;
	}
	
	public List<User> getCouriers() {
		List<User> couriers = new ArrayList<User>();
		
		for (User u : users.values()) {
			if(u.getRole() == Role.COURIER)
				couriers.add(u);
		}
		return couriers;
	}

	public List<User> getUsers() {
		List<User> allUsers = new ArrayList<User>();
		
		for (User u : users.values()) {
				allUsers.add(u);
		}
		return allUsers;
	}

	public void setUsers(LinkedHashMap<String, User> users) {
		this.users = users;
	}
	
	public List<User> getGolden() {
		List<User> customers = new ArrayList<User>();
		
		for (User u : users.values()) {
			if(u.getRole() == Role.CUSTOMER && u.getType().getName() == Type.GOLD)
				customers.add(u);
		}
		return customers;
	}
	
	public List<User> getSilver() {
		List<User> customers = new ArrayList<User>();
		
		for (User u : users.values()) {
			if(u.getRole() == Role.CUSTOMER && u.getType().getName() == Type.SILVER)
				customers.add(u);
		}
		return customers;
	}
	
	public List<User> getBronze() {
		List<User> customers = new ArrayList<User>();
		
		for (User u : users.values()) {
			if(u.getRole() == Role.CUSTOMER && u.getType().getName() == Type.BRONZE)
				customers.add(u);
		}
		return customers;
	}
	

	
	public List<User> filter(String option){
		List<User> retVal = new ArrayList<User>();
		switch(option) {
		  case "Managers":
			  retVal = getManagers();
		    break;
		  case "Couriers":
		    retVal = getCouriers();
		    break;
		  case "Customers":
			retVal = getCustomers();
			break;
		  case "Golden":
			retVal = getGolden();
			 break;
		  case "Silver":
			retVal = getSilver();
			  break;
		  case "Bronze":
			retVal = getBronze();
			  break;
		  default:
			retVal = getUsers();
		}
		
		return retVal;
	}
	
	
}