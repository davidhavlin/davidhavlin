export default {
	env: {
		dev: process.env.NODE_ENV !== 'production',
	},
	router: { middleware: ['routeMiddleware'] },
	loading: '~/components/app/LoadingComponent.vue',
	/*
	 ** Nuxt rendering mode
	 ** See https://nuxtjs.org/api/configuration-mode
	 */
	mode: 'universal',
	/*
	 ** Nuxt target
	 ** See https://nuxtjs.org/api/configuration-target
	 */
	target: 'server',
	/*
	 ** Headers of the page
	 ** See https://nuxtjs.org/api/configuration-head
	 */
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				hid: 'description',
				name: 'description',
				content: process.env.npm_package_description || '',
			},
		],

		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		script: [
			{ src: '../three.min.js' },
			{ src: '../TweenMax.min.js' },
			{ src: '../hover-effect.umd.js' },
			{
				src: 'https://kit.fontawesome.com/2c3ac5bea1.js',
				crossorigin: 'anonymous',
			},
		],
	},
	/*
	 ** Global CSS
	 */
	css: ['~/assets/scss/global.scss'],
	/*
	 ** Plugins to load before mounting the App
	 ** https://nuxtjs.org/guide/plugins
	 */
	plugins: [
		'~/plugins/directives.js',
		'~/plugins/route',
		{ src: '~/plugins/vue-lazyload.js', mode: 'client' },
	],
	/*
	 ** Auto import components
	 ** See https://nuxtjs.org/api/configuration-components
	 */
	components: true,
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [
		// Doc: https://github.com/nuxt-community/eslint-module
		'@nuxtjs/eslint-module',
	],
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'nuxt-svg-loader',
	],

	/*
	 ** Axios module configuration
	 ** See https://axios.nuxtjs.org/options
	 */
	axios: {
		baseURL: '/',
	},
	/*
	 ** Build configuration
	 ** See https://nuxtjs.org/api/configuration-build/
	 */
	build: {},

	// serverMiddleware: ['~/api/contact'],
	// serverMiddleware: [
	// 	{ path: '/contact', handler: '~/functions/send-email/send-email.js' },
	// ],
}
