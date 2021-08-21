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
	
	public CustomerType(Type name) {
		super();
		this.name = name;

		if(name == Type.BRONZE) {
			this.requiredPoints = 25;
			this.discount = 10;
		}
		else if(name == Type.SILVER) {
			this.requiredPoints = 50;
			this.discount = 15;
		}
		else if(name == Type.GOLD) {
			this.requiredPoints = 100;
			this.discount = 20;
		}else {
			this.requiredPoints = 100;
			this.discount = 20;
		}
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
 