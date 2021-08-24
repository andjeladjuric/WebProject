package dao;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Comment;
import beans.State;
import beans.User;

public class CommentsDAO {
	private List<Comment> comments = new ArrayList<Comment>();
	private String path;
	
	public CommentsDAO() {loadFromFile();}
	
	public CommentsDAO(String contextPath) {
		loadFromFile();
	}
	
	private void loadFromFile() {
		ObjectMapper mapper = new ObjectMapper();
	    String path = "E:\\Projects\\WebProject\\FoodDeliveryApp\\src\\files\\comments.json";
	    
	    comments = new ArrayList<Comment>();
	    
	    try {
	        comments = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(path).toFile(), Comment[].class)));

	    } catch (Exception ex) {
	        ex.printStackTrace();
	    }
	}
	
	public void serialize() {
		List<Comment> allComments = new ArrayList<Comment>();
		String path = "E:\\Projects\\WebProject\\FoodDeliveryApp\\src\\files\\comments.json";
		
		for (Comment o : comments) {
			allComments.add(o);
		}

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			objectMapper.writeValue(new FileOutputStream(path), allComments);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public List<Comment> findAll(){
		return comments;
	}
	
	public List<Comment> getCommentsForRestaurant(String restaurantId) {
		List<Comment> commentsForRestaurant = new ArrayList<Comment>();
		
		for(Comment c : comments) {
			if(c.getRestaurantId().equals(restaurantId))
				commentsForRestaurant.add(c);
		}
	
		return commentsForRestaurant;
	}
	
	public List<String> getCustomers(String restaurantId){
		List<String> usersWhoCommented = new ArrayList<String>();
		UsersDAO usersDAO = new UsersDAO();
		usersDAO.load();
		
		for(Comment c : comments) {
			if(c.getRestaurantId().equals(restaurantId)) {
				User user = usersDAO.getByUsername(c.getCustomer());
				usersWhoCommented.add(user.getName() + " " + user.getSurname() + " · " + user.getType().getName());
			}
		}
		return usersWhoCommented;
	}
	
	public void changeStatus(String commentId, State status) {
		for(Comment c : comments) {
			if(c.getId().equals(commentId)) {
				c.setStatus(status);
				break;
			}
		}
		
		serialize();
	}
	
	
	
}











