const CartComponent = {template: '<shopping-cart></shopping-cart>'};
const RestaurantsComponent = {template: '<all-restaurants></all-restaurants>'};
const ProfileComponent = {template: "<currentUser-profile></currentUser-profile>"};
const OrdersComponent = { template: "<all-orders></all-orders>" };
const OrderDetailsComponent = { template: "<order-details></order-details>" };


const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/', component: RestaurantsComponent},
        {path : '/cart', component: CartComponent},
        {path : '/details', component: OrderDetailsComponent},
        {path : '/profile', component: ProfileComponent},
        {path : '/orders', component: OrdersComponent}
        
    ]
})

var adminApp = new Vue({
    router,
    el: '#customer'
});