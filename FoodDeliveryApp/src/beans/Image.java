package beans;

public class Image {
	private String imageId;
	private String imageCode;
	
	public Image(String imageId, String imageCode) {
		super();
		this.imageId = imageId;
		this.imageCode = imageCode;
	}

	public Image() {
		super();
	}

	public String getImageId() {
		return imageId;
	}

	public void setImageId(String imageId) {
		this.imageId = imageId;
	}

	public String getImageCode() {
		return imageCode;
	}

	public void setImageCode(String imageCode) {
		this.imageCode = imageCode;
	}
	
}
