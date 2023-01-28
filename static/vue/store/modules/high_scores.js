export default {
    state: {
        high_scores: []
    },
    getters: {
        high_scores(state, getters) {
            return state.high_scores
        }
    },
    actions: {
        fetch_highscores(context, value) {
            high_scores = [
                {name: 'd', score: 124},
                {name: 'Jonathon Byers', score: 12},
                {name: 'Eleven', score: 11},
            ]
            context.commit('update_highscores', {high_scores})
        },
        add_highscore(context, value) {
            high_score = value
            // await call to add highscore to database and then redo fetch_highscores
            // context.dispatch('update_highscores')
        }
    },
    mutations: {
        update_highscores(state, {high_scores}) {
            state.high_scores = high_scores
        }
    },
}
