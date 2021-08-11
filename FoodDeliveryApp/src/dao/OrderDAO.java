package dao;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Order;
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
	
	public List<Order> findAll(){
		return orders;
	}
	
	public List<Order> getOrdersForCourier(User user){
		List<Order> courierOrders = new ArrayList<Order>();
		
		for(String id : user.getOrdersForCourier()) {
			if(getOrderById(id) != null) {
				courierOrders.add(getOrderById(id));
			}
		}
		
		return courierOrders;
	}
	
	private Order getOrderById(String id) {
		for (Order o : orders) {
			if(o.getId().equals(id))
				return o;
		}
		
		return null;
	}
}
