const home = { template: "<all-restaurants></all-restaurants>" };
const myRestaurant = { template: "<myrestaurant></myrestaurant>" };
const profile = { template: "<currentUser-profile></currentUser-profile>" };
const navbar = { template: "<manager-navbar></manager-navbar>" };
const orderDetails = {
    template: "<manager-order-details></manager-order-details>",
};

const router = new VueRouter({
    mode: "hash",
    routes: [
        { path: "/", component: home },
        { path: "/myRestaurant", component: myRestaurant },
        { path: "/profile", component: profile },
        { path: "/details", component: orderDetails },
    ],
});

new Vue({
    router,
    el: "#manager",
});
