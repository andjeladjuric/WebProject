package beans;

public class Location {
	
	private Address address; 
	private double latitude;
	private double longitude;
	
	public Location() {
		super();
	}

	public Location(Address address, double d, double e) {
		super();
		this.address = address;
		this.latitude = d;
		this.longitude = e;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}
	
	
}