package beans;

public class Address {
	private String street;
	private int number;
	private String city;
	private int postcode;
	
	public Address() {
		super();
	}

	public Address(String street, int number, String city, int postcode) {
		super();
		this.street = street;
		this.number = number;
		this.city = city;
		this.postcode = postcode;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public int getPostcode() {
		return postcode;
	}

	public void setPostcode(int postcode) {
		this.postcode = postcode;
	}

	
}

