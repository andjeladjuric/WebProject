package dao;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Item;
import beans.Order;
import beans.OrderRequests;
import beans.OrderStatus;
import beans.Restaurant;
import beans.User;
import dto.OrderDTO;
import dto.OrderItemDTO;

public class OrderDAO {
	private List<Order> orders = new ArrayList<Order>();
	
	public OrderDAO() {}
	
	public OrderDAO(String contextPath) {
		loadFromFile(contextPath);
	}
	
	private void loadFromFile(String contextPath) {
		ObjectMapper mapper = new ObjectMapper();
	    String path = "src/files/orders.json";
	    
	    orders = new ArrayList<Order>();
	    
	    try {
	        orders = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(path).toFile(), Order[].class)));

	    } catch (Exception ex) {
	        ex.printStackTrace();
	    }
	}
	
	public void serialize() {
		List<Order> allOrders = new ArrayList<Order>();
		String path = "src/files/orders.json";
		
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
	
	public void sendRequestToManager(OrderRequests r) {
		OrderRequestDAO requestsDAO = new OrderRequestDAO();
		
		for(Order o : orders) {
			if(o.getId().equals(r.getOrderId())) {
				requestsDAO.insert(r);
			}
		}
	}
	
	public boolean alreadyExists(OrderRequests r) {
		OrderRequestDAO requestsDAO = new OrderRequestDAO();
		
		if(requestsDAO.findAll().contains(r))
			return true;
		
		return false;
	}
	
	public List<Order> getOrderByRestaurant(String restaurantId) {
		List<Order> ordersForRestaurant = new ArrayList<Order>();
		for(Order o : orders) {
			if(o.getRestaurant().getId().equals(restaurantId))
				ordersForRestaurant.add(o);
		}
		
		return ordersForRestaurant;
	}

	public List<Order> getDeliveredForCustomer(User user){
		List<Order> customerOrders = new ArrayList<Order>();
		
		for(String id : user.getOrders()) {
			if(getOrderById(id) != null && (getOrderById(id).getStatus().equals(OrderStatus.DELIVERED)))  {
				customerOrders.add(getOrderById(id));
			}
		}
		
		return customerOrders;
	}
	
	public List<Order> getNotDeliveredForCustomer(User user){
		List<Order> customerOrders = new ArrayList<Order>();
		
		for(String id : user.getOrders()) {
			if(getOrderById(id) != null && (!getOrderById(id).getStatus().equals(OrderStatus.DELIVERED)))  {
				customerOrders.add(getOrderById(id));
			}
		}
		
		return customerOrders;
	}
	
	public void cancelOrder(String id) {
		 List<Order> allOrders = new ArrayList<Order>();
		 
		 for(Order o : orders) {
			 if(o.getId().equals(id))
				 o.setDeleted(true);
			 allOrders.add(o);
		 }
		 
		 orders = allOrders;
		 
		 serialize();	
	}
	
	public List<String> getCouriersFromRequests(String restaurantId){
		List<String> names = new ArrayList<String>();
		OrderRequestDAO requestsDAO = new OrderRequestDAO();
		UsersDAO usersDAO = new UsersDAO();
		usersDAO.load();
		
		for(OrderRequests r : requestsDAO.findAll()) {
			if(r.getRestaurantId().equals(restaurantId)) {
				User user = usersDAO.getByUsername(r.getCourier());
				names.add(user.getName() + " " + user.getSurname());
			}
		}
		
		return names;
	}

	public void makeOrders(OrderDTO dto, User u) {
		String customer = u.getName() + " " + u.getSurname();

		List<Restaurant> allRestaurants = getRestaurants(dto.cart.getItems());
		for(Restaurant r : allRestaurants) {
			String id = UUID.randomUUID().toString();
			List<OrderItemDTO> items = getItemsForRestaurant(dto.cart.getItems(), r.getId());
			double price = getPrice(items);
			Order newOrder = new Order(id, false, items, r, new Date(), price, customer, OrderStatus.PROCESSING, dto.address);
			orders.add(newOrder);
		}
		serialize();
	}
	
	private List<Restaurant> getRestaurants(List<Item> items){
		List<Restaurant> retVal = new ArrayList<Restaurant>();
		RestaurantDAO dao = new RestaurantDAO();
		
		for(Item i : items) {
			if(!alreadyExists(retVal, i.getRestaurantId()))
				retVal.add(dao.getById(i.getRestaurantId()));
		}
		return retVal;
	}
	
	private boolean alreadyExists(List<Restaurant> restaurants, String rest) {
		for(Restaurant r : restaurants )
			if(r.getId().equals(rest))
				return true;
		return false;
	}
	
	private List<OrderItemDTO> getItemsForRestaurant(List<Item> items, String restaurant){
		List<OrderItemDTO> itemsDTO = new ArrayList<OrderItemDTO>();
		
		for(Item i : items) {
			if(i.getRestaurantId().equals(restaurant))
			{
				OrderItemDTO dto = new OrderItemDTO();
				dto.item = i;
				dto.quantity = (int) i.getQuantity();
				itemsDTO.add(dto);
			}
		}
		return itemsDTO;
	}
	
	private double getPrice(List<OrderItemDTO> items) {
		double price = 0;
		for(OrderItemDTO i: items) {
			price += i.item.getPrice() * i.quantity;
		}
		
		return price;
	}
}














