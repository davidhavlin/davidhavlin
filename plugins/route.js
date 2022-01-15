export default ({ app, store, router }) => {
	// Every time the route changes (fired on initialization too)
	app.router.afterEach((to, from) => {
		store.commit('SET_PREVIOUS_ROUTE', from.name)

		if (to.name === 'blogs') {
			store.dispatch('fetchBlogs')
		}
	})
	// app.router.beforeEach((to, from, next) => {
	// 	console.log({ to, from, next })
	// })
}
