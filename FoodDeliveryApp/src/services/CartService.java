package services;

import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Item;
import beans.ShoppingCart;
import beans.User;
import dao.CartDAO;
import dao.UsersDAO;


@Path("/carts")
public class CartService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	@GET
	@Path("/getCart")
	@Produces(MediaType.APPLICATION_JSON)
	public ShoppingCart getCart() {
		User user = (User) request.getSession().getAttribute("loginUser");
		CartDAO dao = getCarts();
		return dao.getCart(user.getUsername());
	}
	
	@POST
	@Path("/removeItem")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.TEXT_PLAIN)
	public ShoppingCart removeUser(String id) {
		
		User user = (User) request.getSession().getAttribute("loginUser");
		CartDAO dao = getCarts();
		dao.removeItem(user.getUsername(), id);

		return dao.getCart(user.getUsername()); 
	}
	
	@POST
	@Path("/addToCart")
	@Consumes(MediaType.APPLICATION_JSON)
	public void addToCart(Item item) {
		
		User user = (User) request.getSession().getAttribute("loginUser");
		CartDAO dao = getCarts();
		dao.addItem(user.getUsername(), item);

	}
	
	@GET
	@Path("/emptyCart")
	@Produces(MediaType.APPLICATION_JSON)
	public ShoppingCart emptyCart() {
		User user = (User) request.getSession().getAttribute("loginUser");
		CartDAO dao = getCarts();
		return dao.emptyCart(user.getUsername());
	}
	@POST
	@Path("/restaurantDeleted")
	@Consumes(MediaType.TEXT_PLAIN)
	public void restaurantDeleted(String id) {
		
		CartDAO dao = getCarts();
		dao.restaurantDeleted(id);

	}
	private CartDAO getCarts() {
		
		CartDAO carts = (CartDAO) ctx.getAttribute("carts");
		
		if (carts == null) {
			carts = new CartDAO();
			carts.load();
			ctx.setAttribute("carts", carts);
		}

		return carts;
	}

}
