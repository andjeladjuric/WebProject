package dao;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.apache.commons.lang3.RandomStringUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Item;
import beans.Item;
import beans.Restaurant;

public class ItemsDAO {
	
	private List<Item> items = new ArrayList<Item>();
	private String path;
	
	public ItemsDAO() {loadFromFile();}
	
	public ItemsDAO(String contextPath) {
		loadFromFile();
	}
	
	private void loadFromFile() {
		ObjectMapper mapper = new ObjectMapper();
	    String path = "src/files/items.json";

	    
	    items = new ArrayList<Item>();
	    
	    try {
	        items = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(path).toFile(), Item[].class)));

	    } catch (Exception ex) {
	        ex.printStackTrace();
	    }
	}
	
	public void serialize() {
		List<Item> allItems = new ArrayList<Item>();
		String path = "src/files/items.json";
		
		for (Item o : items) {
			allItems.add(o);
		}

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			objectMapper.writeValue(new FileOutputStream(path), allItems);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public List<Item> findAll(){
		return items;
	}
	
	public Item getItemsById(String id) {
		for(Item i : items) {
			if(i.getId().equals(id))
				return i;
		}
		
		return null;
	}
	
	public List<Item> getItemsInRestaurant(String id){
		RestaurantDAO restaurantDAO = new RestaurantDAO();
		List<Item> foundItems = new ArrayList<Item>();
		
		for(Restaurant r : restaurantDAO.findAll()) {
			if(r.getId().equals(id)) {
				for(String i : r.getItems()) {
					if(!isItemDeleted(i))
						foundItems.add(getItemsById(i));
				}
			}
		}
		
		return foundItems;
	}
	
	private boolean isItemDeleted(String id) {
		for(Item i : items) {
			if(i.getId().equals(id) && i.isDeleted())
				return true;
		}
		
		return false;
	}
	
	public Item getItemById(String id) {
		for(Item i : items) {
			if(i.getId().equals(id))
				return i;
		}
		
		return null;
	}
	
	public void insert(Item i) {
		String id = UUID.randomUUID().toString();
		
		String path = convertImage(i);
		
		Item createdItem = new Item(id, false, i.getName(), i.getPrice(), i.getType(), i.getAmount(), i.getDescription(), path, i.getRestaurantId(),
				i.getCategory());
		items.add(createdItem);
		serialize();
		addItemToRestaurant(i.getRestaurantId(), createdItem.getId());
	}
	
	public void addItemToRestaurant(String id, String itemId) {
		RestaurantDAO restaurantDAO = new RestaurantDAO();
		
		for(Restaurant r : restaurantDAO.findAll()) {
			if(r.getId().equals(id)) {
				r.getItems().add(itemId);
				break;
			}
		}
		
		restaurantDAO.serialize();
	}
	
	public void editItem(Item updatedItem) {
		for(Item i : items) {
			if(i.getId().equals(updatedItem.getId())) {
				i.setName(updatedItem.getName());
				i.setPrice(updatedItem.getPrice());
				i.setType(updatedItem.getType());
				i.setCategory(updatedItem.getCategory());
				i.setAmount(updatedItem.getAmount());
				if(!updatedItem.getImagePath().equals(i.getImagePath())) {
					String imgPath = convertImage(updatedItem);
					i.setImagePath(imgPath);
				}
				i.setDescription(updatedItem.getDescription());
				serialize();
				break;
			}
		}
	}

	private String convertImage(Item updatedItem) {
		UsersDAO dao = new UsersDAO();
		String path = "img/" + updatedItem.getName() + "-" + updatedItem.getRestaurantId() + ".jpg";
		System.out.println(path);
		
		try {
			dao.Base64Decode(updatedItem.getImagePath(), path);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return path;
	}
	
	public void deleteItem(String id) {
		for(Item i : items) {
			if(i.getId().equals(id)){
				i.setDeleted(true);
				serialize();
				removeItemFromRestaurant(i.getRestaurantId(), i.getId());
				break;
			}
		}
	}
	
	public void removeItemFromRestaurant(String id, String itemId) {
		RestaurantDAO restaurantDAO = new RestaurantDAO();
		
		for(Restaurant r : restaurantDAO.findAll()) {
			if(r.getId().equals(id)) {
				r.getItems().remove(itemId);
				break;
			}
		}
		
		restaurantDAO.serialize();
	}
	
}









