package services;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.ShoppingCart;
import beans.User;
import dao.CartDAO;


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
		System.out.println(user.getUsername());
		CartDAO dao = getCarts();
		return dao.getCart(user.getUsername());
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
