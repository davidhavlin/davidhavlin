export const state = () => ({
	previousRoute: null,
	isEnoughStars: false,
	magicStars: false,
	moveStars: false,
	elTop: null,
	elLeft: null,
	blogs: [],
	showcase: false,
})

export const mutations = {
	enoughStars(state) {
		state.isEnoughStars = true
	},
	getElTop(state, top) {
		state.elTop = top
	},
	getElLeft(state, left) {
		state.elLeft = left
	},
	runMagicStars(state) {
		state.magicStars = !state.magicStars
	},
	movingStars(state, bool) {
		state.moveStars = bool
	},
	SET_BLOGS(state, blogs) {
		state.blogs = blogs
	},
	SET_PREVIOUS_ROUTE(state, value) {
		state.previousRoute = value
	},
	SET_SHOWCASE(state, value) {
		state.showcase = value
	},
	TOGGLE_SHOWCASE(state) {
		state.showcase = !state.showcase
	},
}

export const actions = {
	async fetchBlogs({ commit }) {
		const API_URL = process.env.dev
			? 'http://localhost:1337'
			: 'https://api-showmecode.herokuapp.com'
		try {
			const { data: res } = await this.$axios.get(
				`${API_URL}/post/author/3/posts`
			)
			commit('SET_BLOGS', res.data)
		} catch (error) {
			console.log(error)
		}
	},
}
