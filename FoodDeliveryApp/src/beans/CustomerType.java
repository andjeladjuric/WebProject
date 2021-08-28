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
			this.requiredPoints = 2000;
			this.discount = 2;
		}
		else if(name == Type.SILVER) {
			this.requiredPoints = 3000;
			this.discount = 3;
		}
		else if(name == Type.GOLD) {
			this.requiredPoints = 4000;
			this.discount = 4;
		}else {
			this.requiredPoints = 0;
			this.discount = 0;
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
 