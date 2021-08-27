const RestaurantComponent = { template: "<all-restaurants></all-restaurants>" };
const Restaurant = { template: "<selected-restaurant></selected-restaurant>" };

const router = new VueRouter({
    mode: "hash",
    routes: [
        { path: "/", component: RestaurantComponent },
        {path : '/selectedRestaurant', component: Restaurant}
    ],
});

var app = new Vue({
    router,
    el: "#application",
});
