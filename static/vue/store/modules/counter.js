export default {
    state: {
        count: 1
    },
    getters: {
        
    },
    actions: {
        changeCounterBy(context, value) {
            context.commit('addToCounter', {value})
        }
    },
    mutations: {
        addToCounter(state, {value}) {
            state.count += value
        }
    },
}
