package dao;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Restaurant;
import beans.User;
import dto.RestaurantDTO;

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
	        restaurants = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(path).toFile(), Restaurant[].class)));

	    } catch (Exception ex) {
	        ex.printStackTrace();
	    }
	}
	
	public void serialize() {
	    path = "C:\\Users\\jovic\\Desktop\\WebProject\\FoodDeliveryApp\\src\\files\\restaurants.json";


		ObjectMapper objectMapper = new ObjectMapper();
		try {
			// Write them to the file
			objectMapper.writeValue(new FileOutputStream(this.path), restaurants);

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
}

