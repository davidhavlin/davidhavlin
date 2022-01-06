<template>
	<nav class="home-navigation">
		<nuxt-link
			v-for="link in navLinks"
			:key="`link-${link.label}`"
			:to="link.to"
		>
			<div class="link-text">{{ link.label }}</div>
			<div class="link-bg"></div>
		</nuxt-link>
	</nav>
</template>

<script>
export default {
	name: 'HomeNavigation',
	data() {
		return {
			skillsPage: true,
		}
	},
	computed: {
		links() {
			return document.querySelectorAll('.home-navigation a')
		},
		navLinks() {
			return [
				{
					label: 'čo ovládam?',
					to: {
						name: 'about',
						params: { skillsPage: this.skillsPage },
					},
				},
				{
					label: 'projekty',
					to: '/projects',
				},
				{
					label: 'kontaktuj ma',
					to: '/contact',
				},
			]
		},
	},
	mounted() {
		this.links.forEach((link) => {
			this.showLink(link)
			this.showText(link)
		})
	},
	methods: {
		showLink(link) {
			link.addEventListener(
				'animationstart',
				() => {
					link.style.opacity = 1
				},
				{
					once: true,
				}
			)
		},
		showText(link) {
			link.addEventListener(
				'animationend',
				() => {
					setTimeout(() => {
						link.firstChild.style.opacity = 1

						link.firstChild.classList.add('showText')
					}, 300)
				},
				{
					once: true,
				}
			)
		},
	},
}
</script>

<style lang="scss" scoped>
.showText {
	animation: flash;
	animation-duration: 1s;
}
.home-navigation {
	display: flex;
	flex-direction: column;
	align-items: center;
	pointer-events: initial;

	a {
		opacity: 0;
		position: relative;
		margin-bottom: 2rem;
		animation: backInUp;
		animation-duration: 2s;
		animation-delay: 500ms;

		&:nth-child(2) {
			animation-delay: 700ms;
		}
		&:nth-child(3) {
			animation-delay: 900ms;
			margin-bottom: 0;
		}

		&:hover {
			// color: #34b1f8;
			color: #fff;
			.link-bg {
				height: calc(100% + 12px);
				// outline: 2px solid #0fd7d7;
				background: #260a4b;
			}
			.link-text {
				color: #0fd7d7;
			}
		}
	}
	.link-text {
		opacity: 0;
		position: relative;
		z-index: 1;
		color: #6a24f3;
	}
	.link-bg {
		position: absolute;
		bottom: -5px;
		left: -7px;
		right: -33px;
		width: 106%;
		height: 12px;
		background: #200840;
		z-index: 0;
		transition: height 0.1s ease;
	}
}
</style>
