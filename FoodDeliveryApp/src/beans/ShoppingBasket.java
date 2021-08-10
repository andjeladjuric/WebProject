package beans;

import java.util.HashMap;

public class ShoppingBasket {
	
	private String id;
	private String customer; // username
	private HashMap<String, Integer> items = new HashMap<String, Integer>(); // Cuvati cijeli item ili kljuc napraviti?
	private double totalPrice;
	
	public ShoppingBasket() {}

	public ShoppingBasket(String id, String customer, HashMap<String, Integer> items, double totalPrice) {
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

	public HashMap<String, Integer> getItems() {
		return items;
	}

	public void setItems(HashMap<String, Integer> items) {
		this.items = items;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
	
	
}
