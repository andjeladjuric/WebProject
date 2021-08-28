package beans;

public class Comment {
	
	private String id;
	private String customer; // username
	private String restaurantId; 
	private String text;
	private int stars;
	private State status;
	private boolean deleted;
	
	public Comment() {}
	
	public Comment(String id, String customer, String restaurantId, String text, int stars, State status) {
		super();
		this.id = id;
		this.customer = customer;
		this.restaurantId = restaurantId;
		this.text = text;
		this.stars = stars;
		this.status = status;
		this.deleted = false;
	}
	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
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
	public String getRestaurantId() {
		return restaurantId;
	}
	public void setRestaurantId(String restaurantId) {
		this.restaurantId = restaurantId;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public int getStars() {
		return stars;
	}
	public void setStars(int stars) {
		this.stars = stars;
	}
	public State getStatus() {
		return status;
	}
	public void setStatus(State status) {
		this.status = status;
	}
	
	
	
}
