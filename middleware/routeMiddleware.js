export default ({ route, from, store, redirect, isServer }) => {
	if (isServer) return

	console.log('MIDDLEWARE', route, from, redirect)
	if (from) {
		// return new Promise((resolve) => {
		// 	setTimeout(resolve, 1000)
		// })
	}
}
