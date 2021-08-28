const UsersComponent = {template: '<administrator-users></administrator-users>'}
const RestaurantComponent = {template: '<restaurant-form></restaurant-form>'}
const ProfileComponent = {template: "<currentUser-profile></currentUser-profile>"};
const RestaurantsComponent = {template: '<all-restaurants></all-restaurants>'};
const SelectedRestaurant = { template: "<selected-restaurant></selected-restaurant>" };




const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/', component: RestaurantsComponent},
        {path : '/users', component: UsersComponent},
        {path : '/newRestaurant', component: RestaurantComponent},
        {path : '/profile', component: ProfileComponent},
        {path : '/selectedRestaurant', component: SelectedRestaurant},
           
    ]
})

var adminApp = new Vue({
    router,
    el: '#administrator'
});