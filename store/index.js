export const state = () => ({
	isEnoughStars: false,
	magicStars: false,
	moveStars: false,
	elTop: null,
	elLeft: null,
	blogs: [],
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
}

export const actions = {
	async fetchBlogs({ commit }) {
		try {
			const { data: res } = await this.$axios.get(
				// 'https://api-showmecode.herokuapp.com'
				// 'http://localhost:1337/post/author/2/posts'
				'http://localhost:1337/post/author/2/posts'
			)
			commit('SET_BLOGS', res.data)
		} catch (error) {
			console.log(error)
		}
	},
}
