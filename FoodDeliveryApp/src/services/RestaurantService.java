package services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
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
import beans.Role;
import beans.User;
import dao.RestaurantDAO;
import dao.UsersDAO;
import dto.RestaurantDTO;
import dto.SignupDTO;

@Path("/restaurants")
public class RestaurantService {

	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;
	
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
	
	@POST
	@Path("/addNewRestaurant")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Collection<Restaurant> addNewRestaurant(RestaurantDTO rest) {
		RestaurantDAO dao = (RestaurantDAO) ctx.getAttribute("restaurants");
		dao.addNew(rest);
		return dao.findAll();
	}
	
	@POST
	@Path("/getById")
	@Produces(MediaType.APPLICATION_JSON)
	public Restaurant getById(String id) {
		RestaurantDAO dao = (RestaurantDAO) ctx.getAttribute("restaurants");
		return dao.getById(id);
	}

	@GET
	@Path("/getRestaurantForManager")
	@Produces(MediaType.APPLICATION_JSON)
	public Restaurant getForManager(){
		RestaurantDAO dao = (RestaurantDAO) ctx.getAttribute("restaurants");
		User user = (User) request.getSession().getAttribute("loginUser");
		
		if(user.getRole() == Role.MANAGER)
			return dao.getRestaurantByManager(user.getUsername());
		
		return null;
	}

}











