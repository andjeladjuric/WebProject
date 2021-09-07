package beans;

import java.util.ArrayList;

import dto.RestaurantDTO;


public class Restaurant {
	
	private String name;
	private String id;
	private boolean deleted;
	private RestaurantType type; 
	private RestStatus status;
	private Location location;
	private ArrayList<String> items = new ArrayList<String>();
	private String logo; 
	private String menagerId;
	private int rating;
	private ArrayList<WorkingHours> workingHours = new ArrayList<WorkingHours>();

	public ArrayList<WorkingHours> getWorkingHours() {
		return workingHours;
	}

	public void setWorkingHours(ArrayList<WorkingHours> workingHours) {
		this.workingHours = workingHours;
	}
	
	public Restaurant() {}
	
	public Restaurant(RestaurantDTO rest, String id, ArrayList<WorkingHours> hours) {
		this.name = rest.name;
		this.id = id;
		this.deleted = false;
		this.type = rest.type;
		this.status = status.OPENED;
		this.logo = rest.logo;
		this.menagerId = rest.menagerId;
		this.location = rest.location;
		this.workingHours = hours;
	}

	

	public Restaurant(String name, String id, boolean deleted, RestaurantType type, RestStatus status, Location location,
			ArrayList<String> items, String logo, String menagerId, int rating, ArrayList<WorkingHours> workingHours) {
		super();
		this.name = name;
		this.id = id;
		this.deleted = deleted;
		this.type = type;
		this.status = status;
		this.location = location;
		this.items = items;
		this.logo = logo;
		this.menagerId = menagerId;
		this.rating = rating;
		this.workingHours = workingHours;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public RestaurantType getType() {
		return type;
	}

	public void setType(RestaurantType type) {
		this.type = type;
	}

	public RestStatus getStatus() {
		return status;
	}

	public void setStatus(RestStatus status) {
		this.status = status;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public ArrayList<String> getItems() {
		return items;
	}

	public void setItems(ArrayList<String> items) {
		this.items = items;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getMenagerId() {
		return menagerId;
	}

	public void setMenagerId(String menagerId) {
		this.menagerId = menagerId;
	}
	
	
	
}

