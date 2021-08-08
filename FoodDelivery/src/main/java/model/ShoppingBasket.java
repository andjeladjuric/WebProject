package model;

import java.util.HashMap;

public class ShoppingBasket {
	
	private String id;
	private String customer; // username
	private HashMap<String, Integer> items = new HashMap<String, Integer>(); // Cuvati cijeli item ili kljuc napraviti?
	private double totalPrice;
}
