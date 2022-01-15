<template>
	<div
		ref="container"
		class="page-about-container"
		@touchstart="onTouchStart"
		@touchmove="onTouchMove"
	>
		<AboutMe
			ref="boxes"
			:next-page="nextPage"
			:page-loading="pageLoading"
			:sliding="sliding"
		/>
		<div class="sign-overflow">
			<AboutPlanetSign
				class="little-star"
				:class="{ reveal: clickSign }"
			/>
		</div>

		<main ref="main">
			<section class="about-section">
				<AboutRightArrow
					v-show="!nextPage"
					:info-sign="infoSign"
					@click.native="clickNext"
				/>
				<div class="fog"></div>
				<div class="movable-wrapper" :class="{ planetMove: nextPage }">
					<Planet class="planet2" />
				</div>
			</section>
			<section class="skill-section">
				<AboutLeftArrow v-show="nextPage" @click.native="clickPrev" />
				<AboutSolarSystem :next-page="nextPage" />
			</section>
		</main>
	</div>
</template>

<script>
import Planet from '~/assets/images/svg/Planet.svg'
export default {
	components: {
		Planet,
	},
	data() {
		return {
			pageLoading: undefined,
			sliding: false,
			nextPage: false,
			infoSign: true,
			clickSign: false,
			xTouch: null,
			yTouch: null,
		}
	},
	computed: {
		draggingSign() {
			return this.$store.state.draggingSign
		},
		loadingComponent() {
			return this.$store.state.pageLoading
		},
	},
	watch: {
		loadingComponent(loading) {
			if (loading) return
			this.addEventListeners()
			this.nextOnStart()
		},
	},
	mounted() {
		if (this.loadingComponent) return
		this.addEventListeners()
		this.nextOnStart()
	},
	beforeDestroy() {
		console.log('BEFORE DESTROY')
		this.$refs.container.removeEventListener(
			'animationstart',
			this.onAnimationStart
		)
		this.$refs.container.removeEventListener(
			'animationend',
			this.onAnimationEnd
		)
		this.$refs.main.removeEventListener(
			'transitionstart',
			this.onTransitionStart
		)
		this.$refs.main.removeEventListener(
			'transitionend',
			this.onTransitionEnd
		)
		window.removeEventListener('resize', this.debounce(this.onResize, 400))
	},
	methods: {
		nextOnStart() {
			if (this.$route.params.skillsPage) {
				setTimeout(() => {
					this.clickNext()
				}, 1000)
			} else {
				setTimeout(() => {
					if (!this.nextPage) {
						this.clickSign = true
					}
				}, 1000)
			}
		},
		addEventListeners() {
			this.$refs.container.addEventListener(
				'animationstart',
				this.onAnimationStart
			)
			this.$refs.container.addEventListener(
				'animationend',
				this.onAnimationEnd
			)

			this.$refs.main.addEventListener(
				'transitionstart',
				this.onTransitionStart
			)
			this.$refs.main.addEventListener(
				'transitionend',
				this.onTransitionEnd
			)

			window.addEventListener('resize', this.debounce(this.onResize, 400))
		},
		onResize() {
			const comp = this.$refs.boxes
			if (!comp) return
			comp.calculateSizes('ghostAbout')
			comp.calculateSizes('ghostSkill')
			comp.setSize(this.nextPage ? 'skillSize' : 'aboutSize')
		},
		debounce(cbFunc, delay = 250) {
			let timeoutId
			return (...args) => {
				clearTimeout(timeoutId)
				timeoutId = setTimeout(() => {
					timeoutId = null
					cbFunc(...args)
				}, delay)
			}
		},
		onTransitionStart(e) {
			if (e.target !== this.$refs.main) return
			this.sliding = true
		},
		onTransitionEnd(e) {
			if (e.target !== this.$refs.main) return
			this.sliding = false
		},
		onAnimationStart(e) {
			if (e.animationName !== 'pageEnter') return
			this.pageLoading = true
		},
		onAnimationEnd(e) {
			if (e.animationName !== 'pageEnter') return
			this.pageLoading = false
		},
		clickNext(e) {
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
		clickPrev() {
			this.$refs.main.style.transform = 'translateX(0)'
			this.nextPage = false
			this.clickSign = true

			document.title = 'About me'
			this.$store.commit('movingStars', this.nextPage)
		},
		onTouchStart(e) {
			if (this.draggingSign) return
			const firstTouch = e.touches[0]
			this.xTouch = firstTouch.clientX
			this.yTouch = firstTouch.clientY
		},
		onTouchMove(e) {
			if (!this.xTouch || !this.yTouch || this.draggingSign) return

			const xDiff = this.xTouch - e.touches[0].clientX
			const yDiff = this.yTouch - e.touches[0].clientY

			if (Math.abs(xDiff) > Math.abs(yDiff)) {
				if (xDiff > 0) {
					this.clickNext()
				} else {
					this.clickPrev()
				}
			}
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
	// height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	background: var(--main-bg-color);
	overflow: hidden;
}
.sign-overflow {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.little-star {
	transform: translate(30%, 30%);
	transition: transform 700ms cubic-bezier(0.785, 0.135, 0.15, 0.86),
		z-index 700ms cubic-bezier(0.785, 0.135, 0.15, 0.86);
	left: 0 !important;
	top: 0 !important;
	z-index: 1;
}
.reveal {
	transform: translate(0, 0);
	z-index: 1000000000000;
}
.little-star /deep/ .sign {
	transform: scale(0.01);
	transition: transform 700ms cubic-bezier(0.785, 0.135, 0.15, 0.86);
	z-index: 1;
}
.reveal /deep/ .sign {
	transform: scale(1);
	z-index: 1000000000000;
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
