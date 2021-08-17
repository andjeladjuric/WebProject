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
import javax.ws.rs.core.Response;

import beans.Role;
import beans.User;
import dao.UsersDAO;
import dto.LoginDTO;
import dto.SignupDTO;


@Path("/users")
public class UserService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext ctx;
	
	@POST
	@Path("/login")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public String login(LoginDTO user) {
		UsersDAO allUsersDAO = getUsers();

		User userForLogin = allUsersDAO.getByUsername(user.username);

		if (userForLogin == null) {
			return "User not found";
		}	
		
		if (!userForLogin.getPassword().equals(user.password)) {
			return "bad password";
		}
		
		if(userForLogin.isBlocked() || userForLogin.isDeleted()) {
			return "blocked";
		}

		request.getSession().setAttribute("loginUser", userForLogin); // we give him a session

		if (userForLogin.getRole() == Role.ADMINISTRATOR) {
			return "/FoodDeliveryApp/administratorPage.html";

		} else if (userForLogin.getRole() == Role.MANAGER) {
			return "";

		} else if (userForLogin.getRole() == Role.CUSTOMER) {
			return "";

		} else {
			return "";
		}		
	}
	
	@POST
	@Path("/signup")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public String signup(SignupDTO user) {
		UsersDAO allUsersDAO = getUsers();

		if (allUsersDAO.alreadyExists(user.username)) {
			return "Username taken";
		}else {
			allUsersDAO.addNewUser(user);
		}
		
		User newUser = allUsersDAO.getByUsername(user.username);
		request.getSession().setAttribute("loginUser", newUser); // we give him a session

		return "/FoodDeliveryApp/html/administrator.html"; // stranica za kupca
	}
	
	@GET
	@Path("/getUsers")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public List<User> getAllUsers() {
		UsersDAO allUsersDAO = getUsers();

		return allUsersDAO.getUsers(); 
	}
	
	@GET
	@Path("/getCustomers")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public List<User> getCustomers() {
		UsersDAO allUsersDAO = getUsers();

		return allUsersDAO.getCustomers(); 
	}
	
	@GET
	@Path("/getManagers")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public List<User> getManagers() {
		UsersDAO allUsersDAO = getUsers();

		return allUsersDAO.getManagers(); 
	}
	
	@GET
	@Path("/getCouriers")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public List<User> getCouriers() {
		UsersDAO allUsersDAO = getUsers();

		return allUsersDAO.getCouriers(); 
	}
	
	
	private UsersDAO getUsers() {
		
		UsersDAO users = (UsersDAO) ctx.getAttribute("users");
		
		if (users == null) {
			users = new UsersDAO();
			users.load();
			ctx.setAttribute("users", users);
		}

		return users;
	}
}
