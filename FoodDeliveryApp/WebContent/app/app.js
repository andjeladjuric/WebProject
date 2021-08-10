const RestaurantComponent = { template: '<view-restaurants></view-restaurants>'}
const RegistrationComponent = { template: '<app-register></app-register>'}
const LoginComponent = { template: '<app-login></app-login>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		  { path: '/', component: RestaurantComponent},
		  { path: '/restaurants', component: RestaurantComponent},
		  { path: '/register', component: RegistrationComponent},
		  { path: '/login', component: LoginComponent}
		  
	  ]
});

var app = new Vue({
	router,
	el: '#application'
});
