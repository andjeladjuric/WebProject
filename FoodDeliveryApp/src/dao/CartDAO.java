package dao;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Item;
import beans.Order;
import beans.ShoppingCart;
import beans.User;

public class CartDAO {
	
	private List<ShoppingCart> carts;
	private String path = "src/files/carts.json";
	
	public CartDAO() {
		carts = new ArrayList<ShoppingCart>();
	}
	
	public void serialize() {
		
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			// Write them to the file
			objectMapper.writeValue(new FileOutputStream(this.path), carts);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void load() {
		ObjectMapper mapper = new ObjectMapper();
	    	    
	    try {
	    	carts = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(path).toFile(), ShoppingCart[].class)));

	    } catch (Exception ex) {
	        ex.printStackTrace();
	    }
	}
	
	public ShoppingCart getCart(String username) {
		for(ShoppingCart cart : carts) {
			if(cart.getCustomer().equals(username))
				return cart;
		}
		return null;
	}
	
	public void removeItem(String user, String item) {
		
		List<ShoppingCart> newCarts = new ArrayList<ShoppingCart>();
		List<Item> items = new ArrayList<Item>();
		
		for(ShoppingCart cart : carts) {
			if(cart.getCustomer().equals(user)) {
				for(Item i : cart.getItems()) {
					if(!i.getId().equals(item)) {
						items.add(i);
					}
				}
				cart.setItems(items);
				cart.setTotalPrice();
			}
			newCarts.add(cart);
		}
		carts = newCarts;
		serialize();
	}
	
	public void addItem(String user, Item item) {
		List<ShoppingCart> newCarts = new ArrayList<ShoppingCart>();
		List<Item> items = new ArrayList<Item>();
		boolean alreadyExists = false;
		
		for(ShoppingCart cart : carts) {
			if(cart.getCustomer().equals(user)) {
				for(Item i : cart.getItems()) {
					if(i.getId().equals(item.getId())) {
						alreadyExists = true;
						double quantity = i.getQuantity();
						i.setQuantity(++quantity);
					}
					items.add(i);	
				}
				if(!alreadyExists) {
					items.add(item);
				}
				cart.setItems(items);
				cart.setTotalPrice();
			}
			newCarts.add(cart);
		}
		carts = newCarts;
		serialize();
	}
	
	public ShoppingCart emptyCart(String user) {

		List<ShoppingCart> newCarts = new ArrayList<ShoppingCart>();
		
		for(ShoppingCart cart : carts) {
			if(cart.getCustomer().equals(user)) {
					cart.setItems(new ArrayList<Item>());
					cart.setTotalPrice();
				}
			newCarts.add(cart);

			}
		carts = newCarts;
		serialize();
		return getCart(user);
	}
	
	public void restaurantDeleted(String id) {
		List<ShoppingCart> newCarts = new ArrayList<ShoppingCart>();
		List<Item> items = new ArrayList<Item>();
		
		for(ShoppingCart cart : carts) {
				for(Item i : cart.getItems()) {
					if(!i.getRestaurantId().equals(id)) {
						items.add(i);
					}
				cart.setItems(items);
				cart.setTotalPrice();
			}
			newCarts.add(cart);
		}
		carts = newCarts;
		serialize();
	}

	public void createNew(User user) {
		load();
		String id = getUniqueId();
		ShoppingCart newCart = new ShoppingCart(id, user.getUsername(), new ArrayList<Item>(), 0);
		carts.add(newCart);
		serialize();
	}
	
	public String getUniqueId() {
		String id;
		while(true) {
			 id = RandomStringUtils.randomAlphanumeric(5);
			if(!alreadyExists(id))
				return id;
		}
	}
	
	public boolean alreadyExists(String id) {
		
		for(ShoppingCart o : carts) {
			if(o.getId().equals(id))
				return true;
		}
		return false;
	}

}
