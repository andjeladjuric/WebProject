package services;

import java.sql.SQLException;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.sql.rowset.serial.SerialException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Image;
import dao.ImageDAO;

@Path("/images")
public class ImageService {
	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;
	
	public ImageService() {}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("images") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("images", new ImageDAO(contextPath));
		}
	}
	
	@GET
	@Path("/getAllImages")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Image> getAllImages(){
		ImageDAO dao = (ImageDAO) ctx.getAttribute("images");
		return dao.findAll();
	}
	
	@POST
	@Path("/addNewImage")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.TEXT_PLAIN)
	public Image addNewImage(String code) throws SerialException, SQLException{
		ImageDAO dao = (ImageDAO) ctx.getAttribute("images");
		return dao.insert(code);
	}
}

















