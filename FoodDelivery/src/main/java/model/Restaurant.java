package model;

import java.util.ArrayList;

enum Status { Open, Closed }
enum RestaurantType { italian }

public class Restaurant {
	
	private String name;
	private String id;
	private boolean deleted;
	private RestaurantType type; // enumeracija?
	private Status status;
	private Location location;
	private ArrayList<String> items = new ArrayList<String>();
	private String logo; // image path
	

}
