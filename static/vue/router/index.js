var Home = httpVueLoader("/static/vue/pages/home.vue")
var Synth = httpVueLoader("/static/vue/pages/synth.vue")


const routes = [
    {
        path: '/', 
        component: Home,
        name: 'Home',
    },
    // {
    //     path: '/piano', 
    //     component: Synth,
    //     name: 'Synth',
    // },
    // {
    //     path: '/:catchAll(.*)*',
    //     name: "Home",
    //     component: Home,
    //   },
]

export default new VueRouter({
    routes,
    mode: 'history',

})
