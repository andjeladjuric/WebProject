package beans;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ShoppingCart {
	
	private String id;
	private String customer; // username
	private List<Item> items = new ArrayList<Item>(); // Cuvati cijeli item ili kljuc napraviti?
	private double totalPrice;
	
	public ShoppingCart() {}

	public ShoppingCart(String id, String customer, List<Item> items, double totalPrice) {
		super();
		this.id = id;
		this.customer = customer;
		this.items = items;
		this.totalPrice = totalPrice;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public List<Item> getItems() {
		return items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
	
	
}
