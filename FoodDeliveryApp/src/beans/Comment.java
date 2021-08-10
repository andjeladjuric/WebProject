package beans;

enum State {REJECTED, ACCEPTED}
public class Comment {
	
	private String customer; // username
	private String restaurantId; 
	private String text;
	private int stars;
	private State status;
	
}
