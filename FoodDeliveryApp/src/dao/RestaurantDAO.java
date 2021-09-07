package dao;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Comparator;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Item;
import beans.Order;
import beans.RestStatus;
import beans.Restaurant;
import beans.User;
import beans.WorkingHours;
import dto.RestaurantDTO;
import dto.WorkingHoursDTO;

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
			if(r.isDeleted() == false) {
				boolean opened = isOpened(r);
				if(opened) {
					r.setStatus(RestStatus.OPENED);	
				}
				else {
					r.setStatus(RestStatus.CLOSED);
				}
				
				allRestaurants.add(r);
			}
		
		allRestaurants.sort(Comparator.comparing(Restaurant::getStatus));
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
		ArrayList<WorkingHours> workingHours = createWorkingHours(rest.workingHours);
		Restaurant newRest = new Restaurant(rest, getUniqueId(), workingHours);
		restaurants.add(newRest);
		serialize();
		
	}
	
	private ArrayList<WorkingHours> createWorkingHours(WorkingHoursDTO workingHours) {
		
		WorkingHours mon = new WorkingHours(2, workingHours.opens,workingHours.closes, false);
		WorkingHours tue = new WorkingHours(3, workingHours.opens, workingHours.closes, false);
		WorkingHours wed = new WorkingHours(4, workingHours.opens, workingHours.closes, false);
		WorkingHours thur = new WorkingHours(5, workingHours.opens, workingHours.closes, false);
		WorkingHours fri = new WorkingHours(6, workingHours.opens, workingHours.closes, false);
		WorkingHours sat = new WorkingHours(7, workingHours.opensw, workingHours.closesw, workingHours.sat);
		WorkingHours sun = new WorkingHours(1, workingHours.opensw, workingHours.closesw, workingHours.sun);
		ArrayList<WorkingHours> ret = new ArrayList<WorkingHours>();
		ret.add(mon);
		ret.add(tue);
		ret.add(wed);
		ret.add(thur);
		ret.add(fri);
		ret.add(sat);
		ret.add(sun);
		return ret;
	}

	public Restaurant getById(String id) {
		for(Restaurant r : restaurants) {
			if(r.getId().equals(id) && !r.isDeleted()) {
				boolean opened = isOpened(r);
				if(opened)
					r.setStatus(RestStatus.OPENED);
				else
					r.setStatus(RestStatus.CLOSED);
				return r;
			}	
		}
		return null;
	}

	public Restaurant getRestaurantByManager(String username) {
		loadFromFile();
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
	
	public boolean isOpened(Restaurant r) {
		
		Restaurant restaurant = r;
		Calendar calendar = Calendar.getInstance();
		int day = calendar.get(Calendar.DAY_OF_WEEK);
		LocalTime now = LocalTime.now();
		
		for(WorkingHours w : restaurant.getWorkingHours()) {
			if(w.getDayOfWeek() == day) {
				if(w.isClosed()) 
					return false;
				if(now.compareTo(LocalTime.parse(w.getStartTime())) >= 0 && now.compareTo(LocalTime.parse(w.getEndTime())) < 0) 
					return true;
			}
		}
		return false;
	}
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
}












