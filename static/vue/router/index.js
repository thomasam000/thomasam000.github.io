var Home = httpVueLoader("/static/vue/pages/home.vue")
var Darts = httpVueLoader("/static/vue/pages/darts.vue")


const routes = [
    {
        path: '/', 
        component: Home,
        name: 'Home',
    },
    {
        path: '/darts', 
        component: Darts,
        name: 'Darts',
    },
    // {
    //     path: '/:catchAll(.*)*',
    //     name: "Home",
    //     component: Home,
    //   },
]

export default new VueRouter({
    routes,
    // mode: 'history',

})
