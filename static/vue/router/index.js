var Home = httpVueLoader("/static/vue/pages/home.vue")


const routes = [
    {
        path: '/', 
        component: Home,
        name: 'Home',
    },
]

export default new VueRouter({
    routes,
    mode: 'history',

})
