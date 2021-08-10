package dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
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
	    String path = "E:\\Projects\\WebProject\\FoodDeliveryApp\\src\\files\\restaurants.json";
	    
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
}

