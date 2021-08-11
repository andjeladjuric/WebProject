const HomeComponent = {template: '<administrator-home></administrator-home>'}

const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/', component: HomeComponent}
    ]
})

var adminApp = new Vue({
    router,
    el: '#administrator'
});