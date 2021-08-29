package beans;

enum ItemType { Drink, Food }
enum Category {BREAKFAST, SALADS, PIZZA, PASTA, MAINDISHES, DRINKS, DESSERT}

public class Item {
	
	private String id;
	private boolean deleted;
	private String name;
	private double price;
	private ItemType type;
	private double amount;
	private String description;
	private String imagePath;
	private String restaurantId;
	private String restaurant;
	private double quantity;
	private Category category;
	

	public Item() {}

	public Item(String id, boolean deleted, String name, double price, ItemType type, double amount, String description,
			String imagePath, String restaurantId, String restaurant, Category category) {
		super();
		this.id = id;
		this.deleted = deleted;
		this.name = name;
		this.price = price;
		this.type = type;
		this.amount = amount;
		this.description = description;
		this.imagePath = imagePath;
		this.restaurantId = restaurantId;
		this.restaurant = restaurant;
		this.quantity = 1;
	}

	public String getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(String restaurant) {
		this.restaurant = restaurant;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public ItemType getType() {
		return type;
	}

	public void setType(ItemType type) {
		this.type = type;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(String restaurantId) {
		this.restaurantId = restaurantId;
	}
	
	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}
}
