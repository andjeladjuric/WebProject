package dao;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import javax.ws.rs.core.Response.Status;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Comment;
import beans.Restaurant;
import beans.State;
import beans.User;
import dto.CommentDTO;

public class CommentsDAO {
	private List<Comment> comments = new ArrayList<Comment>();
	private String path;
	
	public CommentsDAO() {loadFromFile();}
	
	public CommentsDAO(String contextPath) {
		loadFromFile();
	}
	
	private void loadFromFile() {
		ObjectMapper mapper = new ObjectMapper();
	    String path = "src/files/comments.json";

	    
	    comments = new ArrayList<Comment>();
	    
	    try {
	        comments = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(path).toFile(), Comment[].class)));

	    } catch (Exception ex) {
	        ex.printStackTrace();
	    }
	}
	
	public void serialize() {
		List<Comment> allComments = new ArrayList<Comment>();
		String path = "src/files/comments.json";

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
			if(c.getRestaurantId().equals(restaurantId) && !c.isDeleted())
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
				usersWhoCommented.add(user.getName() + " " + user.getSurname());
			}
		}
		return usersWhoCommented;
	}
	
	public void changeStatus(String commentId, State status) {
		for(Comment c : comments) {
			if(c.getId().equals(commentId)) {
				c.setStatus(status);
				serialize();
				setRating(c.getRestaurantId());
				break;
			}
		}
	}
	
	private void setRating(String restaurantId) {
		List<Integer> ratings = getRatings(restaurantId);
		int all = 0;
		int newRating = 0;
		
		for(int i : ratings) {
			all = all + i;
		}
		
		newRating = Math.round(all/ratings.size());
		RestaurantDAO dao = new RestaurantDAO();
		dao.getById(restaurantId).setRating(newRating);
		dao.serialize();
	}
	
	private List<Integer> getRatings(String restaurantId) {
		List<Integer> ratings = new ArrayList<Integer>();
		
		for(Comment c : getCommentsForRestaurant(restaurantId)) {
			if(c.getStatus() == State.ACCEPTED)
				ratings.add(c.getStars());
		}
		
		return ratings;
	}

	public void addComment(CommentDTO comment, User user) {
		String id = UUID.randomUUID().toString();
		Comment newComment = new Comment(id, user.getUsername(), comment.restaurant, comment.text, comment.rating, State.UNDEFINED);
		comments.add(newComment);
		serialize();
	}

	public List<Comment> getCommentsForUser(String restaurantId) {
		List<Comment> commentsForRestaurant = new ArrayList<Comment>();
		
		for(Comment c : comments) {
			if(c.getRestaurantId().equals(restaurantId) && (c.getStatus() == State.ACCEPTED) && !c.isDeleted())
				commentsForRestaurant.add(c);
		}
	
		return commentsForRestaurant;
		
	}

	public List<Comment> getCommentsForAdmin(String restaurantId) {
		List<Comment> commentsForRestaurant = new ArrayList<Comment>();
		
		for(Comment c : comments) {
			if(c.getRestaurantId().equals(restaurantId) && !c.isDeleted())
				commentsForRestaurant.add(c);
		}
	
		return commentsForRestaurant;
	}

	public void removeComment(String comment) {
		for(Comment c : comments) {
			if(c.getId().equals(comment)) {
				c.setDeleted(true);
				break;
			}
		}
		serialize();
		
	}
	
	
}











