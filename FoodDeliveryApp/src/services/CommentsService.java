package services;

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

import beans.Comment;
import beans.Role;
import beans.State;
import beans.User;
import dao.CommentsDAO;
import dto.CommentDTO;

@Path("/comments")
public class CommentsService {
	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;
	
	public CommentsService() {}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("comments") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("comments", new CommentsDAO(contextPath));
		}
	}
	
	@GET
	@Path("/getCommentsForManager")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCommentsForManager(@QueryParam("id") String restaurantId){
		CommentsDAO dao = (CommentsDAO) ctx.getAttribute("comments");
		User user = (User) request.getSession().getAttribute("loginUser");
		
		if(user != null && user.getRole() == Role.MANAGER)
			return Response
					.status(Response.Status.ACCEPTED).entity("SUCCESS")
					.entity(dao.getCommentsForRestaurant(restaurantId))
					.build();
		
		return Response.status(403).type("text/plain")
                .entity("You do not have permission to access!").build();
	}
	
	@GET
	@Path("/getCustomers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<String> getCustomer(@QueryParam("id") String restaurantId) {
		CommentsDAO dao = (CommentsDAO) ctx.getAttribute("comments");
		return dao.getCustomers(restaurantId);
	}
	
	@POST
	@Path("/allowComment")
	@Produces(MediaType.APPLICATION_JSON)
	public void allowComment(String commentId) {
		CommentsDAO dao = (CommentsDAO) ctx.getAttribute("comments");
		dao.changeStatus(commentId, State.ACCEPTED);
	}
	
	@POST
	@Path("/rejectComment")
	@Produces(MediaType.APPLICATION_JSON)
	public void rejectComment(String commentId) {
		CommentsDAO dao = (CommentsDAO) ctx.getAttribute("comments");
		dao.changeStatus(commentId, State.REJECTED);
	}
	
	@GET
	@Path("/getCommentsForUser")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Comment> getCommentsForUser(@QueryParam("id") String restaurantId){
		CommentsDAO dao = (CommentsDAO) ctx.getAttribute("comments");
		
		return dao.getCommentsForUser(restaurantId);
		
	}
	
	@POST
	@Path("/addComment")
	@Consumes(MediaType.APPLICATION_JSON)
	public void addComment(CommentDTO comment) {
		CommentsDAO dao = (CommentsDAO) ctx.getAttribute("comments");
		User user = (User) request.getSession().getAttribute("loginUser");

		dao.addComment(comment, user);
	}
}











