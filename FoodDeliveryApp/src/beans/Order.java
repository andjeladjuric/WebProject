package beans;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import dto.OrderItemDTO;

public class Order {
	
	private String id;
	private boolean deleted;
	private List<OrderItemDTO> items = new ArrayList<OrderItemDTO>(); // Cuvati cijeli item ili kljuc napraviti?
	private Restaurant restaurant;
	private Date timeOfOrder;
	private double price;
	private String customer; // full name
	private OrderStatus status;
	private Address address;
	
	public Order() {}

	public Order(String id, boolean deleted, List<OrderItemDTO> items, Restaurant restaurant, Date timeOfOrder,
			double price, String customer, OrderStatus status, Address address) {
		super();
		this.id = id;
		this.deleted = deleted;
		this.items = items;
		this.restaurant = restaurant;
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

	public List<OrderItemDTO> getItems() {
		return items;
	}

	public void setItems(List<OrderItemDTO> items) {
		this.items = items;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
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
