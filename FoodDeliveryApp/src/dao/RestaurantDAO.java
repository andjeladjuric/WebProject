package dao;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Item;
import beans.Order;
import beans.Restaurant;
import beans.User;
import beans.WorkingHours;
import dto.RestaurantDTO;

public class RestaurantDAO {

	private List<Restaurant> restaurants = new ArrayList<Restaurant>();
	private String path;
	
	public RestaurantDAO() {loadFromFile();}
	
	public RestaurantDAO(String contextPath) {
		loadFromFile();
	}
	
	private void loadFromFile() {
		ObjectMapper mapper = new ObjectMapper();
	    String path = "src/files/restaurants.json";
	    
	    restaurants = new ArrayList<Restaurant>();
	    
	    try {
	        restaurants = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(path).toFile(), Restaurant[].class)));

	    } catch (Exception ex) {
	        ex.printStackTrace();
	    }
	}
	
	public void serialize() {
		List<Restaurant> allRestaurants = new ArrayList<Restaurant>();
		String path = "src/files/restaurants.json";
		
		for (Restaurant o : restaurants) {
			allRestaurants.add(o);
		}

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			objectMapper.writeValue(new FileOutputStream(path), allRestaurants);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public List<Restaurant> findAll(){
		List<Restaurant> allRestaurants = new ArrayList<Restaurant>();
		
		for(Restaurant r : restaurants)
			if(r.isDeleted() == false)
				allRestaurants.add(r);
		
		return allRestaurants;
	}
	
	public boolean hasRestaurant(String username) {
		
		for(Restaurant r : restaurants) {
			if(r.getMenagerId().equals(username) && !r.isDeleted()) {
				return true;
			}
		}
		return false;
	}
	
	public void addNew(RestaurantDTO rest) {
		Restaurant newRest = new Restaurant(rest, getUniqueId());
		restaurants.add(newRest);
		serialize();
		
	}
	
	public Restaurant getById(String id) {
		for(Restaurant r : restaurants) {
			if(r.getId().equals(id) && !r.isDeleted())
				return r;
		}
		return null;
	}

	public Restaurant getRestaurantByManager(String username) {
		for(Restaurant r : restaurants) {
			if(r.getMenagerId().equals(username) && !r.isDeleted())
				return r;
		}
	
		return null;
	}
	
	public void deleteRestaurant(String id) {
		for(Restaurant r : restaurants) {
			if(r.getId().equals(id))
				r.setDeleted(true);
		}
		serialize();
	}
	
	/*public boolean isOpened(String id) {
		
		Restaurant restaurant = getById(id);
		Calendar calendar = Calendar.getInstance();
		int day = calendar.get(Calendar.DAY_OF_WEEK);
		LocalTime now = LocalTime.now();
		
		for(WorkingHours w : restaurant.getWorkingHours()) {
			if(w.getDayOfWeek() == day) {
				if(w.isClosed()) 
					return false;
				if(now.compareTo(w.getStartTime()) >= 0 && now.compareTo(w.getEndTime()) < 0) 
					return true;
			}
		}
		return false;
	}*/
	public String getUniqueId() {
		String id;
		while(true) {
			 id = RandomStringUtils.randomAlphanumeric(10);
			if(!alreadyExists(id))
				return id;
		}
	}
	
	public boolean alreadyExists(String id) {
		
		for(Restaurant r : restaurants) {
			if(r.getId().equals(id))
				return true;
		}
		return false;
	}












