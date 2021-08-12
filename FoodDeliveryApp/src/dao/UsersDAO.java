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
import beans.User;
import dto.SignupDTO;

public class UsersDAO {
	
	private LinkedHashMap<String, User> users;
	private String path = "E:\\Projects\\WebProject\\FoodDeliveryApp\\src\\files\\users.json";
	
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
	
	public void editUser(User updated) {
		for(User u : users.values()) {
			if(u.getUsername().equals(updated.getUsername())) {
				u.setDateOfBirth(updated.getDateOfBirth());
				u.setGender(updated.getGender());
				u.setName(updated.getName());
				u.setSurname(updated.getSurname());
			}
		}
		
		serialize();
	}
	
	public void changePassword(User updated, String newPassword) {
		for(User u : users.values()) {
			if(u.getUsername().equals(updated.getUsername())) {
				u.setPassword(newPassword);
			}
		}
		
		serialize();
	}
	
}








