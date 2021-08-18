package beans;

public class OrderRequests {
	private String orderId;
	private String restaurantId;
	private String manager;
	private String courier;
	private boolean deleted;
	
	public OrderRequests() {
		super();
	}
	
	public OrderRequests(String orderId, String restaurantId, String manager, String courier, boolean deleted) {
		super();
		this.orderId = orderId;
		this.restaurantId = restaurantId;
		this.manager = manager;
		this.courier = courier;
		this.deleted = deleted;
	}
	
	public String getCourier() {
		return courier;
	}

	public void setCourier(String courier) {
		this.courier = courier;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public String getRestaurantId() {
		return restaurantId;
	}
	public void setRestaurantId(String restaurantId) {
		this.restaurantId = restaurantId;
	}
	public String getManager() {
		return manager;
	}
	public void setManager(String manager) {
		this.manager = manager;
	}
	
	
}
