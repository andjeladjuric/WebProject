package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Item;
import dao.ItemsDAO;
import dao.RestaurantDAO;

@Path("/items")
public class ItemsService {
	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;
	
	public ItemsService() {}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("items") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("items", new ItemsDAO(contextPath));
		}
	}
	
	@GET
	@Path("/getItemsForRestaurant")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Item> getItemsForRestaurant(@QueryParam("id") String id){
		ItemsDAO dao = (ItemsDAO) ctx.getAttribute("items");
		return dao.getItemsInRestaurant(id);
	}
	
	@POST
	@Path("/addNewItem")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void addNewItem(Item i) {
		ItemsDAO dao = (ItemsDAO) ctx.getAttribute("items");
		dao.insert(i);
	}
	
}











