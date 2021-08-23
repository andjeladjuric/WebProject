const CartComponent = {template: '<shopping-cart></shopping-cart>'};
const RestaurantsComponent = {template: '<all-restaurants></all-restaurants>'};
const ProfileComponent = {template: "<currentUser-profile></currentUser-profile>"};
const OrdersComponent = { template: "<all-orders></all-orders>" };
const OrderDetailsComponent = { template: "<one-order></one-order>" };
const RestaurantItems = { template: "<restaurant-items></restaurant-items>" };
const Comments = { template: "<comments></comments>" };
const Restaurant = { template: "<restaurant></restaurant>" };

const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/', component: RestaurantsComponent},
        {path : '/cart', component: CartComponent},
        {path : '/details', component: OrderDetailsComponent},
        {path : '/profile', component: ProfileComponent},
        {path : '/orders', component: OrdersComponent},
        {
            path: "/selectedRestaurant",
            component: Restaurant,
            children: [
                { path: "/selectedRestaurant/", component: RestaurantItems },
                { path: "/selectedRestaurant/comments", component: Comments },
            ],
        },
        
    ]
})

var adminApp = new Vue({
    router,
    el: '#customer'
});