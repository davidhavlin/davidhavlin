export const state = () => ({
	previousRoute: null,
	isEnoughStars: false,
	magicStars: false,
	loadingStars: false,
	moveStars: false,
	elTop: null,
	elLeft: null,
	blogs: [],
	showcase: false,
	draggingSign: false,
	pageLoading: false,
	fetchLoading: false,
})

export const mutations = {
	enoughStars(state) {
		state.isEnoughStars = true
	},
	SET_EL_TOP(state, top) {
		state.elTop = top
	},
	SET_EL_LEFT(state, left) {
		state.elLeft = left
	},
	runMagicStars(state) {
		state.magicStars = !state.magicStars
	},
	TOGGLE_LOADING_STARS(state) {
		state.loadingStars = !state.loadingStars
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
	SET_DRAGGING_SIGN(state, val) {
		state.draggingSign = val
	},
	SET_PAGE_LOADING(state, val) {
		state.pageLoading = val
	},
	SET_FETCH_LOADING(state, val) {
		state.fetchLoading = val
	},
}

export const actions = {
	async fetchBlogs({ commit }) {
		commit('SET_FETCH_LOADING', true)
		// commit('TOGGLE_LOADING_STARS')
		// const loadingInterval = setInterval(() => {
		// 	commit('TOGGLE_LOADING_STARS')
		// }, 1000)

		try {
			const res = await delayFetch(this.$axios)
			commit('SET_BLOGS', res.data)
			return { data: res.data }
		} catch (error) {
			return { error }
		} finally {
			commit('SET_FETCH_LOADING', false)
			// clearInterval(loadingInterval)
			// commit('TOGGLE_LOADING_STARS')
		}
	},
}

const delayFetch = (ax) => {
	return new Promise((resolve, reject) => {
		const USER_ID = process.env.dev ? 1 : 3
		const API_URL = process.env.dev
			? 'http://localhost:1337'
			: 'https://api-showmecode.herokuapp.com'
		setTimeout(async () => {
			try {
				const { data: res } = await ax.get(
					`${API_URL}/post/author/${USER_ID}/posts`
				)
				resolve(res)
			} catch (error) {
				reject(error)
			}
		}, 3000)
	})
}
