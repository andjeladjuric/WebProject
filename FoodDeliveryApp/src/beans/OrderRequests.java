package beans;

public class OrderRequests {
	private String orderId;
	private String restaurantId;
	private String manager;
	private String courier;
	private State status;
	
	public OrderRequests() {
		super();
	}
	
	public OrderRequests(String orderId, String restaurantId, String manager, String courier, State status) {
		super();
		this.orderId = orderId;
		this.restaurantId = restaurantId;
		this.manager = manager;
		this.courier = courier;
		this.status = status;
	}
	
	public String getCourier() {
		return courier;
	}

	public void setCourier(String courier) {
		this.courier = courier;
	}

	public State getStatus() {
		return status;
	}

	public void setStatus(State status) {
		this.status = status;
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
