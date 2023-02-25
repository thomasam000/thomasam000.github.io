<template>
    <div>
        <piano></piano>
    </div>
</template>

<script>
module.exports = {
    components: {
        'piano': httpVueLoader("/static/vue/components/piano-lessons/piano-component.vue")
    },
    props: [],
  	data() {
    	return {
        
        }
    }
}
</script>

<style>
</style>