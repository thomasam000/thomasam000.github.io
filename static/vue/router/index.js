var Home = httpVueLoader("/static/vue/pages/home.vue")
var Darts = httpVueLoader("/static/vue/pages/darts.vue")
var PianoLessons = httpVueLoader("/static/vue/pages/piano-lessons.vue")
var Piano = httpVueLoader("/static/vue/components/piano-lessons/views/piano.vue")
var Rhythm = httpVueLoader("/static/vue/components/piano-lessons/views/rhythm.vue")
var Reading = httpVueLoader("/static/vue/components/piano-lessons/views/reading.vue")


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
    {
        path: '/pianolessons', 
        component: PianoLessons,
        name: 'PianoLessons',
        children: [
            {
                path: '/',
                component: Piano,
                name:'Piano'
            },
            {
                path: 'rhythm',
                component: Rhythm,
                name:'Rhythm'
            },
            {
                path: 'reading',
                component: Reading,
                name:'Reading'

            },
        ]
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
