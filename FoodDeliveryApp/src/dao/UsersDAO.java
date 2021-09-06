package dao;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Role;
import beans.Type;
import beans.User;
import dto.SignupDTO;

public class UsersDAO {
	
	private LinkedHashMap<String, User> users;
	private String path = "src/files/users.json";
	
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
				newUser.gender, newUser.dateOfBirth, newUser.role);
		users.put(createdUser.getUsername(), createdUser);
		serialize();
	}

	
	public boolean alreadyExists(String username) {
		return users.containsKey(username);
	}
	
	
	/*
	 * reference
	 * https://stackoverflow.com/questions/23979842/convert-base64-string-to-image#23979996
	 * https://docs.oracle.com/javase/8/docs/api/java/util/Base64.Decoder.html
	 */
	public void Base64Decode(String base64, String imagePath) throws FileNotFoundException, IOException {
		
		
		String part[] = base64.split(",");
		String path = "WebContent/" + imagePath;
		
		byte[] image = Base64.getDecoder().decode(part[1]);
		
		try (OutputStream stream = new FileOutputStream(path)) {
		    stream.write(image);
		}
	}
	
	public String editUser(User updated, User currentUser) {
		for(User u : users.values()) {
			if(u.getUsername().equals(currentUser.getUsername())) {
				u.setDateOfBirth(updated.getDateOfBirth());
				u.setGender(updated.getGender());
				u.setName(updated.getName());
				u.setSurname(updated.getSurname());
				
				if(!u.getUsername().equals(updated.getUsername())) {
					if (alreadyExists(updated.getUsername()))
						return "Username taken";
					else
					{
						u.setUsername(updated.getUsername());					}
				}
				
				u.setProfilePicPath(updated.getProfilePicPath());
				serialize();
				break;
			}
		}
		
		return "Success";
	}

	private String convertImage(User updated) {
		String path = "img/" + updated.getUsername() + "profileImg.jpg";
		System.out.println(path);
		
		try {
			Base64Decode(updated.getProfilePicPath(), path);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return path;
	}
	
	public void changePassword(User updated, String newPassword) {
		for(User u : users.values()) {
			if(u.getUsername().equals(updated.getUsername())) {
				u.setPassword(newPassword);
				serialize();
				break;
			}
		}
	}

	public List<User> getCustomers() {
		List<User> customers = new ArrayList<User>();
		
		for (User u : users.values()) {
			if(u.getRole() == Role.CUSTOMER && u.isDeleted() == false)
				customers.add(u);
		}
		return customers;
	}
	
	public List<User> getSuspicious() {
		List<User> customers = new ArrayList<User>();
		
		for (User u : users.values()) {
			if(u.getRole() == Role.CUSTOMER && u.isDeleted() == false && u.isSuspicious())
				customers.add(u);
		}
		return customers;
	}
	
	public List<User> getFreeManagers() {
		List<User> freeManagers = new ArrayList<User>();
		List<User> managers = getManagers();
		RestaurantDAO dao = new RestaurantDAO("");
		
		for (User m : managers) {
			if(!dao.hasRestaurant(m.getUsername()))
				freeManagers.add(m);
		}
		return freeManagers;
	}
	
	public List<User> getManagers() {
		List<User> managers = new ArrayList<User>();
		
		for (User u : users.values()) {
			if(u.getRole() == Role.MANAGER  && u.isDeleted() == false && u.isBlocked() == false )
				managers.add(u);
		}
		return managers;
	}
	
	public List<User> getCouriers() {
		List<User> couriers = new ArrayList<User>();
		
		for (User u : users.values()) {
			if(u.getRole() == Role.COURIER  && u.isDeleted() == false && u.isBlocked() == false )
				couriers.add(u);
		}
		return couriers;
	}

	public List<User> getUsers() {
		List<User> allUsers = new ArrayList<User>();
		
		for (User u : users.values()) {
			if(u.isDeleted() == false )
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
			if(u.getRole() == Role.CUSTOMER && u.getType().getName() == Type.GOLD  && u.isDeleted() == false && u.isBlocked() == false )
				customers.add(u);
		}
		return customers;
	}
	
	public List<User> getSilver() {
		List<User> customers = new ArrayList<User>();
		
		for (User u : users.values()) {
			if(u.getRole() == Role.CUSTOMER && u.getType().getName() == Type.SILVER  && u.isDeleted() == false && u.isBlocked() == false )
				customers.add(u);
		}
		return customers;
	}
	
	public List<User> getBronze() {
		List<User> customers = new ArrayList<User>();
		
		for (User u : users.values()) {
			if(u.getRole() == Role.CUSTOMER && u.getType().getName() == Type.BRONZE  && u.isDeleted() == false && u.isBlocked() == false )
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
		  case "Suspicious":
				retVal = getSuspicious();
				  break;
		  case "Administrators":
				retVal = getAdmins();
				  break;
		  default:
			retVal = getUsers();
		}
		
		return retVal;
	}
	
	private List<User> getAdmins() {
		List<User> admins = new ArrayList<User>();
		
		for (User u : users.values()) {
			if(u.getRole() == Role.ADMINISTRATOR  && u.isDeleted() == false)
				admins.add(u);
		}
		return admins;
	}

	public List<User> remove(String username){
		List<User> allUsers = new ArrayList<User>();
		
		for (User u : users.values()) {
			if(u.getUsername().equals(username))
				u.setDeleted(true);
			allUsers.add(u);
		}
		users = new LinkedHashMap<String, User>();
		for (User u : allUsers) {
			users.put(u.getUsername(), u);
		}
		serialize();
		return getUsers();
	}
	
	public List<User> blockUser(String username){
		List<User> allUsers = new ArrayList<User>();
		
		for (User u : users.values()) {
			if(u.getUsername().equals(username))
				u.setBlocked(!u.isBlocked());
			allUsers.add(u);
		}
		users = new LinkedHashMap<String, User>();
		for (User u : allUsers) {
			users.put(u.getUsername(), u);
		}
		serialize();
		return getUsers();
	}

	public void addPoints(String user, double points) {
		load();
		List<User> allUsers = new ArrayList<User>();
		for (User u : users.values()) {
			if(u.getUsername().equals(user))
				{
					u.setPoints(u.getPoints() + points);
					u.setType();
				}
			allUsers.add(u);
		}
		users = new LinkedHashMap<String, User>();
		for (User u : allUsers) {
			users.put(u.getUsername(), u);
		}
		serialize();
	}
	
	public void removePoints(String user, double points) {
		load();
		List<User> allUsers = new ArrayList<User>();
		for (User u : users.values()) {
			if(u.getUsername().equals(user))
				{
					u.setPoints(u.getPoints() - points);
					u.setType();
				}
			allUsers.add(u);
		}
		users = new LinkedHashMap<String, User>();
		for (User u : allUsers) {
			users.put(u.getUsername(), u);
		}
		serialize();
	}

	public void setSuspicious(String customer) {
		load();
		List<User> allUsers = new ArrayList<User>();
		for (User u : users.values()) {
			if(u.getUsername().equals(customer))
					u.setSuspicious(true);
			allUsers.add(u);
		}
		users = new LinkedHashMap<String, User>();
		for (User u : allUsers) {
			users.put(u.getUsername(), u);
		}
		serialize();
		
	}
}
