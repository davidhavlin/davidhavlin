<template>
	<div class="page-about-container">
		<AboutMe :next-page="nextPage" />
		<AboutPlanetSign class="little-star" :class="{ reveal: clickSign }" />

		<main ref="main">
			<section class="about-section">
				<AboutRightArrow
					v-show="!nextPage"
					:info-sign="infoSign"
					@click.native="handleClickNext"
				/>
				<div class="fog"></div>
				<div class="movable-wrapper" :class="{ planetMove: nextPage }">
					<!-- <AboutPlanetSign /> -->
					<!-- <PlanetBig class="planet1" /> -->
					<Planet class="planet2" />
				</div>
			</section>
			<section class="skill-section">
				<AboutLeftArrow
					v-show="nextPage"
					@click.native="handleClickPrev"
				/>
				<AboutSolarSystem :next-page="nextPage" />
			</section>
		</main>
	</div>
</template>

<script>
import Planet from '~/assets/images/svg/Planet.svg'
// import PlanetBig from '~/assets/images/svg/PlanetBig.svg'
export default {
	components: {
		Planet,
		// PlanetBig,
	},
	data() {
		return {
			nextPage: false,
			infoSign: true,
			clickSign: false,
		}
	},
	mounted() {
		if (this.$route.params.skillsPage) {
			setTimeout(() => {
				this.handleClickNext()
			}, 1000)
		} else {
			setTimeout(() => {
				this.clickSign = true
			}, 1000)
		}
	},
	methods: {
		handleClickNext(e) {
			if (e) {
				if (e.target.className === 'exit') {
					this.infoSign = false
					return
				}
			}
			this.$refs.main.style.transform = 'translateX(-100%)'
			this.nextPage = true
			this.infoSign = false
			this.clickSign = false
			document.title = 'Skills'
			this.$store.commit('movingStars', this.nextPage)
		},
		handleClickPrev() {
			this.$refs.main.style.transform = 'translateX(0)'
			this.nextPage = false
			this.clickSign = true

			document.title = 'About me'
			this.$store.commit('movingStars', this.nextPage)
		},
	},
	head() {
		return {
			title: 'David Havlin - About me',
		}
	},
}
</script>

<style lang="scss" scoped>
.page-about-container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	background: var(--main-bg-color);
	overflow: hidden;
	// pointer-events: none;
}
.little-star {
	transform: scale(0.01);
	transition: all 700ms cubic-bezier(0.785, 0.135, 0.15, 0.86);
	left: 40% !important;
	top: 30% !important;
}
.reveal {
	transform: scale(1);
	left: 0 !important;
	top: 0 !important;
}

main {
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	transition: all 1s ease;
	pointer-events: none;
}
section {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 1;
}
.fog {
	position: absolute;
	width: 3679px;
	height: 433px;
	z-index: 1;
	opacity: 0.2;
	bottom: 0;
	pointer-events: none;
	background: url('~assets/images/fog.webp') no-repeat;
	background-position: bottom;
	animation: fog 65s infinite linear;
}
@keyframes fog {
	0%,
	100% {
		transform: translateX(0px);
	}
	50% {
		transform: translateX(-700px);
	}
}
.movable-wrapper {
	pointer-events: none;
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: -3;
	transition: transform 1s ease;

	.planet2 {
		position: absolute;
		top: 100px;
		right: 100px;
		width: 150px;
		height: auto;
		opacity: 0.3;
	}
}
.planetMove {
	transform: translateX(340px);
}

.about-section {
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	pointer-events: none;
}
.skill-section {
	left: 100%;
	background: #0e031b;
}
</style>
