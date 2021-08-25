package beans;

public class OrderRequests {
	private String requestId;
	private String orderId;
	private String restaurantId;
	private String manager;
	private String courier;
	private State status;
	private boolean deleted;
	
	public OrderRequests() {
		super();
	}
	
	public OrderRequests(String requestId, String orderId, String restaurantId, String manager, String courier, State status, boolean deleted) {
		super();
		this.requestId = requestId;
		this.orderId = orderId;
		this.restaurantId = restaurantId;
		this.manager = manager;
		this.courier = courier;
		this.status = status;
		this.deleted = deleted;
	}
	
	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public String getRequestId() {
		return requestId;
	}

	public void setRequestId(String requestId) {
		this.requestId = requestId;
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
