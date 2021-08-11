package dao;

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
	private String path;
	
	public UsersDAO() {
		users = new LinkedHashMap<String, User>();
	}
	
	public void serialize() {}
	
	public void load() {
		ObjectMapper mapper = new ObjectMapper();
	    path = "C:\\Users\\jovic\\Desktop\\WebProject\\FoodDeliveryApp\\src\\files\\users.json";
	    
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
	}

	
	public boolean alreadyExists(String username) {
		return users.containsKey(username);
	}
}