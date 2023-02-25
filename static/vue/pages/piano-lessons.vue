<template>
    <div>
        <div class="nav-bar">
            <router-link :to="{name: 'Piano'}">
                <div class="nav-link">
                    Home
                </div>
            </router-link>
            <router-link :to="{name: 'Rhythm'}">
                <div class="nav-link">
                    Rhythm Exercises
                </div>
            </router-link>
            <router-link :to="{name: 'Reading'}">
                <div class="nav-link">
                    Reading Exercises
                </div>
            </router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
module.exports = {
    components: {

    },
    props: [],
  	data() {
    	return {
        
        }
    }
}
</script>

<style>
.nav-bar {
    height:50px;
    width:100%;
    background-color:black;
    color:white;
}
.nav-link {
    color:white;
    line-height:50px;
    padding:0 10px;
    display:inline-block;
}
</style>