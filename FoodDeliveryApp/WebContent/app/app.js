const RestaurantComponent = { template: '<all-restaurants></all-restaurants>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		  { path: '/', component: RestaurantComponent}
	  ]
});

var app = new Vue({
	router,
	el: '#application'
});
