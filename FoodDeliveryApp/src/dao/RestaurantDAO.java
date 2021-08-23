package dao;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Item;
import beans.Restaurant;
import beans.User;
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
	    String path = "E:\\Projects\\WebProject\\FoodDeliveryApp\\src\\files\\restaurants.json";
	    
	    restaurants = new ArrayList<Restaurant>();
	    
	    try {
	        restaurants = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(path).toFile(), Restaurant[].class)));

	    } catch (Exception ex) {
	        ex.printStackTrace();
	    }
	}
	
	public void serialize() {
		List<Restaurant> allRestaurants = new ArrayList<Restaurant>();
		String path = "E:\\Projects\\WebProject\\FoodDeliveryApp\\src\\files\\restaurants.json";
		
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
		return restaurants;
	}
	
	public boolean hasRestaurant(String username) {
		
		for(Restaurant r : restaurants) {
			if(r.getMenagerId().equals(username)) {
				return true;
			}
		}
		return false;
	}
	
	public void addNew(RestaurantDTO rest) {
		Restaurant newRest = new Restaurant(rest);
		restaurants.add(newRest);
		serialize();
		
	}
	
	public Restaurant getById(String id) {
		for(Restaurant r : restaurants) {
			if(r.getId().equals(id))
				return r;
		}
		
		return null;
	}

	public Restaurant getRestaurantByManager(String username) {
		for(Restaurant r : restaurants) {
			if(r.getMenagerId().equals(username))
				return r;
		}
	
		return null;
	}
}












