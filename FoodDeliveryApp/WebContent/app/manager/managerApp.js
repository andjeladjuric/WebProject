const home = { template: "<all-restaurants></all-restaurants>" };
const myRestaurant = { template: "<myrestaurant></myrestaurant>" };
const profile = { template: "<currentUser-profile></currentUser-profile>" };
const navbar = { template: "<manager-navbar></manager-navbar>" };
const orderDetails = {
    template: "<manager-order-details></manager-order-details>",
};
const restaurantItems = { template: "<restaurant-items></restaurant-items>" };
const comments = { template: "<comments></comments>" };
const orders = { template: "<rest-orders></rest-orders>" };

const router = new VueRouter({
    mode: "hash",
    routes: [
        { path: "/", component: home },
        {
            path: "/myRestaurant",
            component: myRestaurant,
            children: [
                { path: "/myRestaurant/", component: restaurantItems },
                { path: "/myRestaurant/comments", component: comments },
                { path: "/myRestaurant/orders", component: orders },
                {
                    path: "/myRestaurant/orders/details",
                    component: orderDetails,
                },
            ],
        },
        { path: "/profile", component: profile },
    ],
});

new Vue({
    router,
    el: "#manager",
});
