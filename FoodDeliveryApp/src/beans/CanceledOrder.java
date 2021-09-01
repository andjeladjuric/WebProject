package beans;

import java.util.Date;

public class CanceledOrder {
	private String user;
	private Date day;
	
	public CanceledOrder() {}
	
	public CanceledOrder(String user, Date day) {
		super();
		this.user = user;
		this.day = day;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public Date getDay() {
		return day;
	}
	public void setDay(Date day) {
		this.day = day;
	}
	
	

}
