package dao;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.OrderRequests;

public class OrderRequestDAO {
private List<OrderRequests> requests = new ArrayList<OrderRequests>();
	
	public OrderRequestDAO() {loadFromFile();}
	
	public OrderRequestDAO(String contextPath) {
		loadFromFile();
	}
	
	private void loadFromFile() {
		ObjectMapper mapper = new ObjectMapper();
	    String path = "E:\\Projects\\WebProject\\FoodDeliveryApp\\src\\files\\requests.json";
	    
	    requests = new ArrayList<OrderRequests>();
	    
	    try {
	        requests = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(path).toFile(), OrderRequests[].class)));

	    } catch (Exception ex) {
	        ex.printStackTrace();
	    }
	}
	
	public void serialize() {
		List<OrderRequests> allrequests = new ArrayList<OrderRequests>();
		String path = "E:\\Projects\\WebProject\\FoodDeliveryApp\\src\\files\\requests.json";
		
		for (OrderRequests o : requests) {
			allrequests.add(o);
		}

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			objectMapper.writeValue(new FileOutputStream(path), allrequests);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public List<OrderRequests> findAll(){
		return requests;
	}
	
	public void insert(OrderRequests o) {
		requests.add(o);
		serialize();
	}
}
