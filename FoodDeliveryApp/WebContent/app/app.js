const RestaurantComponent = { template: "<all-restaurants></all-restaurants>" };
const RestaurantItems = { template: "<restaurant-items></restaurant-items>" };
const Comments = { template: "<comments></comments>" };
const Restaurant = { template: "<restaurant></restaurant>" };

const router = new VueRouter({
    mode: "hash",
    routes: [
        { path: "/", component: RestaurantComponent },
        {
            path: "/selectedRestaurant",
            component: Restaurant,
            children: [
                { path: "/selectedRestaurant/", component: RestaurantItems },
                { path: "/selectedRestaurant/comments", component: Comments },
            ],
        },
    ],
});

var app = new Vue({
    router,
    el: "#application",
});
