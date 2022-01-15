<template>
	<div class="container" :class="{ pageLoading }">
		<TheNavigationBar />
		<NavigationSocials />
		<Nuxt />
		<Stars :show-stars="showStars" />
	</div>
</template>

<script>
export default {
	data() {
		return {
			showStars: false,
			loading: false,
		}
	},
	computed: {
		pageLoading() {
			return this.$store.state.pageLoading
		},
	},
	watch: {
		'$route.path'(newValue, oldValue) {
			;['/about', /* '/blogs', */ '/contact'].includes(newValue)
				? (this.showStars = true)
				: (this.showStars = false)

			if (this.moveStars) this.moveStars = false
		},
	},
	mounted() {
		;['about', /* '/blogs', */ 'contact'].includes(this.$route.name)
			? (this.showStars = true)
			: (this.showStars = false)
	},
}
</script>

<style lang="scss">
@import 'node_modules/animate.css/animate.min.css';
@import '~assets/scss/_colors';

*,
*::before,
*::after {
	box-sizing: border-box;
	margin: 0;
}

html {
	font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
		'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	font-size: 16px;
	word-spacing: 1px;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
}
#__nuxt,
#__layout {
	width: 100%;
	height: 100%;
}

a {
	text-decoration: none;
}

body {
	width: 100%;
	height: 100%;
	background: var(--navbar-color);
	overflow: hidden;
}

.container {
	height: 100%;
}

.loading-component-enter-active,
.loading-component-leave-active {
	transition: opacity 0.5s;
}
.loading-component-enter,
.loading-component-leave-to {
	opacity: 0;
}

// "page" je default nazov transitionu pre hlavne stranky
.page-enter-active {
	animation: pageEnter 1s forwards cubic-bezier(0.55, 0.055, 0.675, 0.19);
	animation-delay: 400ms;
}
.page-leave-active {
	animation: pageLeave 1s forwards cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

@keyframes pageEnter {
	0% {
		transform: scale(0.8);
		opacity: 0;
	}
	50% {
		transform: scale(0.8);
		opacity: 0.2;
	}
	70% {
		transform: scale(0.8);
		opacity: 0.2;
	}
	100% {
		transform: scale(1);
		opacity: 1;
	}
}
@keyframes pageLeave {
	0% {
		transform: scale(1);
		opacity: 1;
	}
	30% {
		transform: scale(0.8);
		opacity: 0.2;
	}
	40% {
		transform: scale(0.8);
	}
	80% {
		transform: scale(0.8);
		opacity: 0;
	}
}

@media (max-width: 800px), (max-height: 460px) {
	body {
		overflow: visible;
	}
}

.pageLoading {
	overflow: hidden;
	pointer-events: none;
}
</style>
