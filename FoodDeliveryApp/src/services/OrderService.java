package services;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.List;

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
import javax.ws.rs.core.Response;

import beans.Order;
import beans.OrderRequests;
import beans.User;
import beans.Role;
import beans.State;
import beans.OrderStatus;
import dao.CartDAO;
import dao.CommentsDAO;
import dao.OrderDAO;
import dao.OrderRequestDAO;
import dto.ChangeStatusDTO;
import dao.UsersDAO;
import dto.OrderDTO;
import dto.RequestStateDTO;

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
	public Collection<Order> getOrdersForCourier() {
		User user = (User) request.getSession().getAttribute("loginUser");
		
		if(user!= null && (user.getRole() == (Role.COURIER))) {
			OrderDAO dao = (OrderDAO) ctx.getAttribute("orders");
			
			return dao.getOrdersForCourier(user);
		}
	
		return null;
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
	
	@POST
	@Path("/orderDelivered")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void orderDelivered(ChangeStatusDTO dto) {
		User user = (User) request.getSession().getAttribute("loginUser");
		
		if(user!= null && (user.getRole() == (Role.COURIER))) {
			OrderDAO dao = (OrderDAO) ctx.getAttribute("orders");
			Order currentOrder = dao.getOrderById(dto.orderId);
			
			if(currentOrder.getStatus() == OrderStatus.TRANSPORTING)
				dao.changeStatus(dto.status, dto.orderId);
		}
	}
	
	
	@POST
	@Path("/sendRequest")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response sendOrderRequest(OrderRequests r) {
		User user = (User) request.getSession().getAttribute("loginUser");
		
		if(user!= null && (user.getRole() == (Role.COURIER))) {
			OrderDAO dao = (OrderDAO) ctx.getAttribute("orders");
			Order currentOrder = dao.getOrderById(r.getOrderId());
			
			if(dao.alreadyExists(r))
				return Response.status(400).type("text/plain")
		                .entity("Already exists!").build();
			
			if(currentOrder.getStatus() == OrderStatus.WAITING) {
				dao.sendRequestToManager(r);
				return Response
						.status(Response.Status.ACCEPTED).entity("SUCCESS")
						.build();
			}
			
		}
		
		return Response.status(403).type("text/plain")
                .entity("Access denied!").build();
	}
	
	@GET
	@Path("/getAllRequests")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<OrderRequests> getAllRequests(){
		OrderRequestDAO requestsDAO = new OrderRequestDAO();
		return requestsDAO.findAll();
	}
	
	@GET
	@Path("/getOrdersForRestaurant")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Order> getOrdersForRestaurant(@QueryParam("id") String id){
		OrderDAO dao = (OrderDAO) ctx.getAttribute("orders");
		return dao.getOrderByRestaurant(id);
	}
	
	@GET
	@Path("/getDeliveredForCustomer")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Order> getDeliveredForCustomer(){
		OrderDAO dao = (OrderDAO) ctx.getAttribute("orders");
		User user = (User) request.getSession().getAttribute("loginUser");
	
		
		return dao.getDeliveredForCustomer(user);
	}
	
	@GET
	@Path("/getNotDeliveredForCustomer")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Order> getNotDeliveredForCustomer(){
		OrderDAO dao = (OrderDAO) ctx.getAttribute("orders");
		User user = (User) request.getSession().getAttribute("loginUser");
	
		
		return dao.getNotDeliveredForCustomer(user);
	}
	
	@GET
	@Path("/cancelOrder")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Order> cancelOrder(@QueryParam("id") String id){
		OrderDAO dao = (OrderDAO) ctx.getAttribute("orders");
		User user = (User) request.getSession().getAttribute("loginUser");		
		 dao.cancelOrder(id);
		return dao.getNotDeliveredForCustomer(user);
	}
	
	@POST
	@Path("/getRequestsByRestaurant")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<OrderRequests> getRequestsForReataurant(String restaurantId){
		OrderRequestDAO requestsDAO = new OrderRequestDAO();
		return requestsDAO.getByRestaurant(restaurantId);
	}
	
	@POST
	@Path("/getCouriersFromRequests")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<String> getCouriersFromRequests(String id){
		OrderDAO dao = (OrderDAO) ctx.getAttribute("orders");
		return dao.getCouriersFromRequests(id);
	}
	
	@POST
	@Path("/changeRequestState")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void requestState(RequestStateDTO dto){
		OrderDAO dao = (OrderDAO) ctx.getAttribute("orders");
		dao.acceptRequest(dto.id, dto.state);
	}
	
	@POST
	@Path("/changeStatus")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void changeStatus(ChangeStatusDTO dto) {
		User user = (User) request.getSession().getAttribute("loginUser");
		
		if(user!= null && (user.getRole() == (Role.MANAGER))) {
			OrderDAO dao = (OrderDAO) ctx.getAttribute("orders");
			Order currentOrder = dao.getOrderById(dto.orderId);
			
			if((currentOrder.getStatus() == OrderStatus.PROCESSING) && (dto.status == OrderStatus.PREPARATION))
				dao.changeStatus(dto.status, dto.orderId);
			else if((currentOrder.getStatus() == OrderStatus.PREPARATION) && (dto.status == OrderStatus.WAITING)) {
				dao.changeStatus(dto.status, dto.orderId);
			}
		}
	}

	@POST
	@Path("/makeOrder")
	@Consumes(MediaType.APPLICATION_JSON)
	public void makeOrder(OrderDTO dto) {
		OrderDAO dao = (OrderDAO) ctx.getAttribute("orders");
		User user = (User) request.getSession().getAttribute("loginUser");
		UsersDAO userDAO = new UsersDAO();
		double points = dto.cart.getTotalPrice()/ 1000 * 133;
		userDAO.addPoints(user.getUsername(), points);

		dao.makeOrders(dto, user);
	}
	
	@GET
	@Path("/canComment")
	public boolean canComment(@QueryParam("id") String restaurantId){
		OrderDAO dao = (OrderDAO) ctx.getAttribute("orders");
		User user = (User) request.getSession().getAttribute("loginUser");
		
		return dao.canComment(restaurantId, user);
		
	}
	
	@POST
	@Path("/restaurantDeleted")
	@Consumes(MediaType.TEXT_PLAIN)
	public void restaurantDeleted(String id) {
		OrderDAO dao = (OrderDAO) ctx.getAttribute("orders");
		
		dao.restaurantDeleted(id);

	}
	
}










