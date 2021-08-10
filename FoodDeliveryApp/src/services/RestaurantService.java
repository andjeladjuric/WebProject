package services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Restaurant;
import dao.RestaurantDAO;

@Path("/restaurants")
public class RestaurantService {

	@Context
	ServletContext ctx;
	
	public RestaurantService() {}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("restaurants") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("restaurants", new RestaurantDAO(contextPath));
		}
	}
	
	@GET
	@Path("/getAll")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Restaurant> getPrijave(){
		RestaurantDAO dao = (RestaurantDAO) ctx.getAttribute("restaurants");

		for (Restaurant p : dao.findAll()) {
			System.out.println("Ime: "+ p.getName() +"\n");
		}

		return dao.findAll();
	}

}










