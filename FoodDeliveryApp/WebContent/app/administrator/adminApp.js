const UsersComponent = {template: '<administrator-users></administrator-users>'}
const RestaurantComponent = {template: '<restaurant-form></restaurant-form>'}
const ProfileComponent = {template: "<currentUser-profile></currentUser-profile>"};
const RestaurantsComponent = {template: '<all-restaurants></all-restaurants>'};




const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/', component: RestaurantsComponent},
        {path : '/users', component: UsersComponent},
        {path : '/newRestaurant', component: RestaurantComponent},
        {path : '/profile', component: ProfileComponent}   
    ]
})

var adminApp = new Vue({
    router,
    el: '#administrator'
});