package beans;

enum ItemType { Drink, Food }

public class Item {
	
	private String id;
	private boolean deleted;
	private String name;
	private double price;
	private ItemType type;
	private double amount;
	private String description;
	private String imagePath;
	private Restaurant restaurant;

}
