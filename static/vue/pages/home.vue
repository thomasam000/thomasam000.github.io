<template>
    <div>
        <three-canvas></three-canvas>
        <!-- Home
        <button @click="subtract_counter"> - </button>
        <span style="padding:5px;">{{counter}}</span>
        <button @click="add_counter"> + </button> -->
    </div>
    
</template>

<script>
module.exports = {
    components: {
        'three-canvas': httpVueLoader("/static/vue/components/canvas.vue")
    },
    data: function() {
        return { 

        }
    },
    methods: {
        add_counter() {
            this.$store.dispatch('changeCounterBy', 1)
        },
        subtract_counter() {
            this.$store.dispatch('changeCounterBy', -1)
        },
    },
    computed: {
        counter() {
            return this.$store.state.counter.count
        },
    },
    async mounted() {

    },
    beforeDestroy() {

    }
}
</script>

<style>

</style>