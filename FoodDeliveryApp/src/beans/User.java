package beans;

import java.util.ArrayList;
import java.util.Date;

public class User {
	
	private String username;
	private String password;
	private String name;
	private String surname;
	private Gender gender;
	private Date dateOfBirth;
	private Role role;
	private String profilePicPath;

	private boolean deleted;
	private boolean blocked;
	private boolean suspicious;
	
	private ArrayList<String> ordersForCourier = new ArrayList<String>(); 
	
	private CustomerType type;
	private double points;

	public User() {}

	public User(String username, String password, String name, String surname, Gender gender, Date dateOfBirth,
			Role role, String profilePicPath, boolean deleted, boolean blocked, ArrayList<String> ordersForCourier,
			CustomerType type, double points) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.role = role;
		this.profilePicPath = profilePicPath;
		this.deleted = deleted;
		this.blocked = blocked;
		this.ordersForCourier = ordersForCourier;
		this.type = type;
		this.points = points;
		this.suspicious = false;
	}

	
	public User(String username, String password, String name, String surname, Gender gender, Date dateOfBirth, Role role, String profileImage) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.role = role;
		this.blocked = false;
		this.deleted = false;
		this.suspicious = false;
		this.profilePicPath = profileImage;
		this.points = 0;
		this.type = new CustomerType(Type.NONE, 0, 0);
	}

	public boolean isSuspicious() {
		return suspicious;
	}

	public void setSuspicious(boolean suspicious) {
		this.suspicious = suspicious;
	}

	public void setType(CustomerType type) {
		this.type = type;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getProfilePicPath() {
		return profilePicPath;
	}

	public void setProfilePicPath(String profilePicPath) {
		this.profilePicPath = profilePicPath;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public boolean isBlocked() {
		return blocked;
	}

	public void setBlocked(boolean blocked) {
		this.blocked = blocked;
	}

	public ArrayList<String> getOrdersForCourier() {
		return ordersForCourier;
	}

	public void setOrdersForCourier(ArrayList<String> ordersForCourier) {
		this.ordersForCourier = ordersForCourier;
	}

	public CustomerType getType() {
		return type;
	}

	public void setType() {
		if(points >= 2000 && points < 3000) {
			this.type = new CustomerType(Type.BRONZE);
		}else if(points >= 3000 && points < 4000) {
			this.type = new CustomerType(Type.SILVER);	
		}else if(points >= 4000){
			this.type = new CustomerType(Type.GOLD);	
		}else {
			this.type = new CustomerType(Type.NONE);	
		}
	}

	public double getPoints() {
		return points;
	}

	public void setPoints(double points) {
		this.points = points;
	}

	
	

	

}
