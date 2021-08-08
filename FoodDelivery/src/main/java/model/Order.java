package model;

import java.util.ArrayList;
import java.util.Date;

enum OrderStatus { PROCESSING, PREPARATION, WAITING, TRANSPORTING, DELIVERED, CANCELED }

public class Order {
	
	private String id;
	private boolean deleted;
	private ArrayList<String> items = new ArrayList<String>();
	private String restaurantId;
	private Date timeOfOrder;
	private double price;
	private String customer; // full name
	private OrderStatus status;
	private Address address;
	
	

}
