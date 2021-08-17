package beans;

public class CustomerType {

	private Type name;
	private double discount;
	private int requiredPoints;
	
	public CustomerType() {}

	public CustomerType(Type name, double discount, int requiredPoints) {
		super();
		this.name = name;
		this.discount = discount;
		this.requiredPoints = requiredPoints;
	}

	public Type getName() {
		return name;
	}

	public void setName(Type name) {
		this.name = name;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	public int getRequiredPoints() {
		return requiredPoints;
	}

	public void setRequiredPoints(int requiredPoints) {
		this.requiredPoints = requiredPoints;
	}
	
	  
	
}
 