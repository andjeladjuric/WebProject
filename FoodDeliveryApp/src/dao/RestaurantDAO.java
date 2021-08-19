package dao;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Restaurant;

public class RestaurantDAO {

	private List<Restaurant> restaurants = new ArrayList<Restaurant>();
	private String path;
	
	public RestaurantDAO() {}
	
	public RestaurantDAO(String contextPath) {
		loadFromFile(contextPath);
	}
	
	private void loadFromFile(String contextPath) {
		ObjectMapper mapper = new ObjectMapper();
	    String path = "C:\\Users\\jovic\\Desktop\\WebProject\\FoodDeliveryApp\\src\\files\\restaurants.json";
	    
	    restaurants = new ArrayList<Restaurant>();
	    
	    try {
	        restaurants = Arrays.asList(mapper.readValue(Paths.get(path).toFile(), Restaurant[].class));

	    } catch (Exception ex) {
	        ex.printStackTrace();
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
}

