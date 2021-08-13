package dao;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Order;
import beans.OrderStatus;
import beans.User;

public class OrderDAO {
	private List<Order> orders = new ArrayList<Order>();
	
	public OrderDAO() {}
	
	public OrderDAO(String contextPath) {
		loadFromFile(contextPath);
	}
	
	private void loadFromFile(String contextPath) {
		ObjectMapper mapper = new ObjectMapper();
	    String path = "E:\\Projects\\WebProject\\FoodDeliveryApp\\src\\files\\orders.json";
	    
	    orders = new ArrayList<Order>();
	    
	    try {
	        orders = Arrays.asList(mapper.readValue(Paths.get(path).toFile(), Order[].class));

	    } catch (Exception ex) {
	        ex.printStackTrace();
	    }
	}
	
	public void serialize() {
		List<Order> allOrders = new ArrayList<Order>();
		String path = "E:\\Projects\\WebProject\\FoodDeliveryApp\\src\\files\\orders.json";
		
		for (Order o : orders) {
			allOrders.add(o);
		}

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			objectMapper.writeValue(new FileOutputStream(path), allOrders);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public List<Order> findAll(){
		return orders;
	}
	
	public List<Order> getOrdersForCourier(User user){
		List<Order> courierOrders = new ArrayList<Order>();
		
		for(String id : user.getOrdersForCourier()) {
			if(getOrderById(id) != null && (!getOrderById(id).getStatus().equals(OrderStatus.DELIVERED)))  {
				courierOrders.add(getOrderById(id));
			}
		}
		
		return courierOrders;
	}
	
	public Order getOrderById(String id) {
		for (Order o : orders) {
			if(o.getId().equals(id))
				return o;
		}
		
		return null;
	}
	
	public List<Order> getWaitingOrders(User user){
		List<Order> waitingOrders = new ArrayList<Order>();
		
		for(Order o : orders) {
			if(o.getStatus().equals(OrderStatus.WAITING) && !getOrdersForCourier(user).contains(o)) {
				waitingOrders.add(o);
			}
		}
		
		return waitingOrders;
	}
	
	public void changeStatus(OrderStatus updatedStatus, String id) {
		for(Order o : orders) {
			if(o.getId().equals(id))
				o.setStatus(updatedStatus);
		}
		
		serialize();
	}
}














