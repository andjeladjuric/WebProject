const home = { template: "<all-restaurants></all-restaurants>" };
const orders = { template: "<all-orders></all-orders>" };
const profile = { template: "<currentUser-profile></currentUser-profile>" };
const navbar = { template: "<courier-navbar></courier-navbar>" };
const orderDetails = { template: "<order-details></order-details>" };
const restaurant = { template: "<selected-restaurant></selected-restaurant>" };

const router = new VueRouter({
    mode: "hash",
    routes: [
        { path: "/", component: home },
        { path: "/orders", component: orders },
        { path: "/profile", component: profile },
        { path: "/details", component: orderDetails },
        { path: "/selectedRestaurant", component: restaurant },
    ],
});

new Vue({
    router,
    el: "#courier",
});
