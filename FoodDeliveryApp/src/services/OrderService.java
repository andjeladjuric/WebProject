package services;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Order;
import beans.User;
import beans.Role;
import dao.OrderDAO;

@Path("/orders")
public class OrderService {
	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;
	
	public OrderService() {}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("orders") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("orders", new OrderDAO(contextPath));
		}
	}
	
	@GET
	@Path("/getAll")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Order> getOrders(){
		OrderDAO dao = (OrderDAO) ctx.getAttribute("orders");

		for (Order p : dao.findAll()) {
			System.out.println("Ime: "+ p.getStatus() +"\n");
		}

		return dao.findAll();
	}
	
	@GET
	@Path("/getForCourier")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getOrdersForCourier() {
		User user = (User) request.getSession().getAttribute("loginUser");
		
		if(user!= null && (user.getRole() == (Role.COURIER))) {
			OrderDAO dao = (OrderDAO) ctx.getAttribute("orders");
			
			return Response
					.status(Response.Status.ACCEPTED).entity("SUCCESS")
					.entity(dao.getOrdersForCourier(user))
					.build();
		}
	
		return Response.status(403).type("text/plain")
                .entity("You do not have permission to access!").build();
	}
	
	@GET
	@Path("/getWaitingOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Order> getWaitingOrders(){
		OrderDAO dao = (OrderDAO) ctx.getAttribute("orders");
		User user = (User) request.getSession().getAttribute("loginUser");
		
		return dao.getWaitingOrders(user);
	}
	
	@GET
	@Path("/getOrderById")
	@Produces(MediaType.APPLICATION_JSON)
	public Order getOrderById(@QueryParam("id") String id){
		OrderDAO dao = (OrderDAO) ctx.getAttribute("orders");
		
		return dao.getOrderById(id);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
