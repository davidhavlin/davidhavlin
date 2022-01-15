<template>
	<div class="home-container">
		<section class="left-section">
			<HomeHeader />

			<HomeNavigation />
		</section>
		<section class="right-section">
			<div ref="hover" class="hover-image"></div>
			<!-- <HomeCodingBackground /> -->
		</section>
	</div>
</template>

<script>
/* eslint-disable */
export default {
	head() {
		return {
			title: 'David Havlin - web developer',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content:
						'Moja osobná portfólio web stránka, David Havlín | My personal portfolio website, David Havlín',
				},
			],
		}
	},
	computed: {
		rightSection() {
			return document.querySelector('.right-section')
		},
	},
	mounted() {
		this.effectHover()

		this.rightSection.addEventListener('animationstart', () => {
			this.rightSection.style.opacity = 1
		})
	},
	methods: {
		effectHover() {
			const effect = new hoverEffect({
				parent: this.$refs.hover,
				intensity: 0.3,
				image1: require('@/assets/images/siluet.webp'),
				image2: require('@/assets/images/me.png'),
				displacementImage: require('@/assets/images/dist2.jpg'),
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.home-container {
	font-family: 'Press Start 2P', cursive;
	position: relative;
	display: flex;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	background: var(--main-bg-color);

	.left-section {
		width: 60%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		pointer-events: none;
		z-index: 2;
	}
	.right-section {
		position: relative;
		width: 40%;
		height: 100%;
		opacity: 0;
		overflow: hidden;
		transition: opacity 2s ease;
		z-index: 1;
	}
}

.hover-image {
	width: 100%;
	height: 100%;
	opacity: 0;
	animation: picture 5s forwards ease;
	animation-delay: 3s;
}

@keyframes picture {
	to {
		opacity: 1;
	}
}

@media (max-width: 870px) {
	.home-container {
		.left-section {
			width: 100%;
		}
		.right-section {
			position: absolute;
			right: 0;
		}
	}
}
@media (max-width: 800px) {
	.home-container {
		height: auto;
		flex-direction: column;

		.left-section {
			padding: 7rem 0;
			height: 100vh;
		}
		.right-section {
			position: relative;
			width: 100%;
			height: 100vh;
		}
	}
}
@media (max-height: 500px) {
	.home-container {
		.left-section {
			padding-top: 2rem;
			justify-content: flex-start;
		}
	}
}
@media (max-height: 430px) {
	.home-container {
		.left-section {
			padding-top: 2rem;
			padding-bottom: 3rem;
			justify-content: center;
			height: 100%;
		}
	}
}
@media (max-width: 470px) and (max-height: 800px) {
	.home-container {
		.left-section {
			padding-top: 3rem;
			justify-content: flex-start;
		}
	}
}
</style>
