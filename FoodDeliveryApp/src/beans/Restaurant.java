package beans;

import java.util.ArrayList;

import dto.RestaurantDTO;

enum Status { Open, Closed }

public class Restaurant {
	
	private String name;
	private String id;
	private boolean deleted;
	private RestaurantType type; 
	private Status status;
	private Location location;
	private ArrayList<String> items = new ArrayList<String>();
	private String logo; 
	private String menagerId;
	private double rating;
	
	public Restaurant() {}
	
	public Restaurant(RestaurantDTO rest) {
		this.name = rest.name;
		this.id = "";
		this.deleted = false;
		this.type = rest.type;
		this.status = Status.Open;
		this.logo = rest.logo;
		this.menagerId = rest.menagerId;
		Address adr = new Address("Dr Sime Milosevica", 6, "Novi Sad", "Serbia", 2100);
		this.location = new Location(adr, 124.55, 245.64);
	}

	public Restaurant(String name, String id, boolean deleted, RestaurantType type, Status status, Location location,
			ArrayList<String> items, String logo, String menagerId, double rating) {
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
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
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

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
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

