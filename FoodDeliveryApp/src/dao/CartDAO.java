package dao;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Item;
import beans.ShoppingCart;

public class CartDAO {
	
	private List<ShoppingCart> carts;
	private String path = "C:\\Users\\jovic\\Desktop\\WebProject\\FoodDeliveryApp\\src\\files\\carts.json";
	
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

}
