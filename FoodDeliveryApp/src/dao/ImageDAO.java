package dao;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Image;

public class ImageDAO {
	
	private List<Image> images = new ArrayList<Image>();
	private String path;
	
	public ImageDAO() {loadFromFile();}
	
	public ImageDAO(String contextPath) {
		loadFromFile();
	}
	
	private void loadFromFile() {
		ObjectMapper mapper = new ObjectMapper();
	    String path = "src/files/images.json";

	    
	    images = new ArrayList<Image>();
	    
	    try {
	        images = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(path).toFile(), Image[].class)));

	    } catch (Exception ex) {
	        ex.printStackTrace();
	    }
	}
	
	public void serialize() {
		List<Image> allImages = new ArrayList<Image>();
		String path = "src/files/images.json";
		
		for (Image i : images) {
			allImages.add(i);
		}

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			objectMapper.writeValue(new FileOutputStream(path), allImages);

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public List<Image> findAll(){
		return images;
	}
	
	public Image insert(String code) {
		Image newImage = new Image();
		String id = UUID.randomUUID().toString();
		newImage.setImageId(id);
		
		newImage.setImageCode(code);
		images.add(newImage);
		serialize();
		
		return newImage;
	}
}
