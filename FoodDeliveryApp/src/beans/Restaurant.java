package beans;

import java.util.ArrayList;

enum Status { Open, Closed }
enum RestaurantType {  ITALIAN, CHINEESE, SERBIAN, FASTFOOD, BARBEQUE  }

public class Restaurant {
	
	private String name;
	private String id;
	private boolean deleted;
	private RestaurantType type; // enumeracija?
	private Status status;
	private Location location;
	private ArrayList<Item> items = new ArrayList<Item>();
	private String logo; 
	private String menagerId;
	
	public Restaurant() {}

	public Restaurant(String name, String id, boolean deleted, RestaurantType type, Status status, Location location,
			ArrayList<Item> items, String logo, String menagerId) {
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

	public ArrayList<Item> getItems() {
		return items;
	}

	public void setItems(ArrayList<Item> items) {
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

