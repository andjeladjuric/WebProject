const HomeComponent = {template: '<administrator-home></administrator-home>'}
const RestaurantComponent = {template: '<restaurant-form></restaurant-form>'}


const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/', component: HomeComponent},
        {path : '/newRestaurant', component: RestaurantComponent}
    ]
})

var adminApp = new Vue({
    router,
    el: '#administrator'
});