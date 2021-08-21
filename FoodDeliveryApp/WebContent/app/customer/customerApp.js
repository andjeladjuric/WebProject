const CartComponent = {template: '<shopping-cart></shopping-cart>'}


const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/', component: CartComponent}
    ]
})

var adminApp = new Vue({
    router,
    el: '#customer'
});