const home = { template: "<all-restaurants></all-restaurants>" };
const orders = { template: "<all-orders></all-orders>" };
const profile = { template: "<currentUser-profile></currentUser-profile>" };
const navbar = { template: "<courier-navbar></courier-navbar>" };

const router = new VueRouter({
    mode: "hash",
    routes: [
        { path: "/", component: home },
        { path: "/orders", component: orders },
        { path: "/profile", component: profile },
    ],
});

new Vue({
    router,
    el: "#courier",
});
