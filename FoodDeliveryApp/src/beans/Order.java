package beans;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

public class Order {
	
	private String id;
	private boolean deleted;
	private HashMap<String, Integer> items = new HashMap<String, Integer>(); // Cuvati cijeli item ili kljuc napraviti?
	private String restaurantId;
	private Date timeOfOrder;
	private double price;
	private String customer; // full name
	private OrderStatus status;
	private Address address;
	
	public Order() {}

	public Order(String id, boolean deleted, HashMap<String, Integer> items, String restaurantId, Date timeOfOrder,
			double price, String customer, OrderStatus status, Address address) {
		super();
		this.id = id;
		this.deleted = deleted;
		this.items = items;
		this.restaurantId = restaurantId;
		this.timeOfOrder = timeOfOrder;
		this.price = price;
		this.customer = customer;
		this.status = status;
		this.address = address;
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

	public HashMap<String, Integer> getItems() {
		return items;
	}

	public void setItems(HashMap<String, Integer> items) {
		this.items = items;
	}

	public String getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(String restaurantId) {
		this.restaurantId = restaurantId;
	}

	public Date getTimeOfOrder() {
		return timeOfOrder;
	}

	public void setTimeOfOrder(Date timeOfOrder) {
		this.timeOfOrder = timeOfOrder;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}
	
	
	
	
	
	

}
