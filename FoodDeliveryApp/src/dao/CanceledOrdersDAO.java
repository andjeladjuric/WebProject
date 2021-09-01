package dao;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.CanceledOrder;
import beans.Order;


public class CanceledOrdersDAO {
	private List<CanceledOrder> orders;
	private String path = "src/files/canceledOrders.json";
	
	public CanceledOrdersDAO() {
		orders = new ArrayList<CanceledOrder>();
		load();
	}
	
	public void serialize() {
		
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			// Write them to the file
			objectMapper.writeValue(new FileOutputStream(this.path), orders);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void load() {
		ObjectMapper mapper = new ObjectMapper();
	    	    
	    try {
	    	orders = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(path).toFile(), CanceledOrder[].class)));

	    } catch (Exception ex) {
	        ex.printStackTrace();
	    }
	}
	
	public void addOrder(Order order) {
		String customer = order.getCustomerId();
		CanceledOrder newOrder = new CanceledOrder(customer, new Date());
		this.orders.add(newOrder);
		serialize();
		if(isSuspicious(customer)) {
			new UsersDAO().setSuspicious(customer);
		}
	}
	
	public List<CanceledOrder> getForCustomer(String id){
		List<CanceledOrder> founded = new ArrayList<CanceledOrder>();
		for(CanceledOrder o : orders) {
			if(o.getUser().equals(id))
				founded.add(o);
		}
		return founded;
	}
	
	public boolean isSuspicious(String id) {
		List<CanceledOrder> all = getForCustomer(id);
		
		if(all.size() < 5)
			return false;
		all.sort(Comparator.comparing(CanceledOrder::getDay));
		
		CanceledOrder last = all.get(0);
		CanceledOrder fifth = all.get(4);
		
		long diff = last.getDay().getTime() - fifth.getDay().getTime();
		diff = TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
		
		if(diff < 30) {
			return true;
		}else
			return false;
	}
}
