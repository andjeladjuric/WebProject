package services;

import java.net.http.HttpRequest;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
import beans.Role;
import beans.User;
import dao.OrderDAO;
import dao.UsersDAO;
import dto.LoginDTO;
import dto.PasswordDTO;
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
			return "/FoodDeliveryApp/managerHomePage.html";

		} else if (userForLogin.getRole() == Role.CUSTOMER) {
			return "/FoodDeliveryApp/customerPage.html";
			
		}else if (userForLogin.getRole() == Role.COURIER) {
			return "/FoodDeliveryApp/courierHomePage.html";

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
			user.role = Role.CUSTOMER;
			allUsersDAO.addNewUser(user);
		}
		
		User newUser = allUsersDAO.getByUsername(user.username);
		request.getSession().setAttribute("loginUser", newUser); // we give him a session

		return "/FoodDeliveryApp/customerPage.html"; // stranica za kupca
	}
	
	@GET
	@Path("/logout")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public void logOut() {
		User user = (User) request.getSession().getAttribute("loginUser");
		
		if(request.getSession() != null && user != null) { 
			ctx.setAttribute("users", null); 
			request.getSession().invalidate();
		}
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
	@Path("/getManagers")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public List<User> getManagers() {
		UsersDAO allUsersDAO = getUsers();

		return allUsersDAO.getFreeManagers(); 
	}
	
	@POST
	@Path("/filter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.TEXT_PLAIN)
	public List<User> filter(String option) {
		
		UsersDAO allUsersDAO = getUsers();

		return allUsersDAO.filter(option); 
	}
	
	
	@POST
	@Path("/addNewUser")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public String addNewUser(SignupDTO user) {
		UsersDAO allUsersDAO = getUsers();

		if (allUsersDAO.alreadyExists(user.username)) {
			return "Username taken";
		}else {
			allUsersDAO.addNewUser(user);
		}
		
		return "/FoodDeliveryApp/administratorPage.html";
	}
	
	@POST
	@Path("/removeUser")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.TEXT_PLAIN)
	public List<User> removeUser(String username) {
		
		UsersDAO allUsersDAO = getUsers();

		return allUsersDAO.remove(username); 
	}
	
	@POST
	@Path("/blockUser")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.TEXT_PLAIN)
	public List<User> blockUser(String username) {
		
		UsersDAO allUsersDAO = getUsers();

		return allUsersDAO.blockUser(username); 
	}
	
	
	@GET
	@Path("/getCurrentUser")
	@Produces(MediaType.APPLICATION_JSON)
	public User getCurrentUser() {
		User user = (User) request.getSession().getAttribute("loginUser");
		return user;
	}
	
	@POST
	@Path("/updateUser")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String updateUser(User updated) {
		UsersDAO dao = getUsers();
		return dao.editUser(updated, getCurrentUser());
	}
	
	@POST
	@Path("/changePassword")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public String changePassword(PasswordDTO updated) {
		UsersDAO dao = getUsers();
		
		User user = getCurrentUser();
		
		if(!user.getPassword().equals(updated.oldPassword))
			return "Old password is incorrect";
		
		if(!updated.newPassword.equals(updated.repeatPassword))
			return "Passwords don't match";
		
		dao.changePassword(user, updated.newPassword);
		return "Success";
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
	
	@POST
	@Path("/removePoints")
	@Consumes(MediaType.APPLICATION_JSON)
	public void signup(Order o) {
		UsersDAO allUsersDAO = getUsers();
		User user = (User) request.getSession().getAttribute("loginUser");
		double points = o.getPrice()/1000*133*4;
		allUsersDAO.removePoints(user.getUsername(), points);
	}
	
}
