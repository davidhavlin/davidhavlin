<template>
	<!-- <transition name="loadingComponent"> -->
	<div
		ref="containerRef"
		class="loading-container"
		:class="{ 'show-loading': loading, delayTransition }"
	>
		<div class="loading">
			<ul ref="terminal" class="terminal"></ul>
			<div>
				<h1 class="loading-title">loading</h1>
				<div class="loading-bar">
					<div
						ref="bar"
						class="bar"
						:class="{ 'loading-animation': animateBar }"
					></div>
				</div>
				<div class="loading-time">
					Estimated time remaining: {{ estimated }}
				</div>
			</div>
		</div>
	</div>
	<!-- </transition> -->
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			lines: [
				'$: > Booting systems...',
				'$: > Total memory found: 256kb',
				'$: > Scanning for bootable media    ■■■■■■■■■■■ 100%',
				'$: > No media found. Booting from network address 3E:40:9C:75',
				'$: > Loading BIOS 2.3               ■■■■■■■■■■■ 100%',
				'$: > Reticulating splines           ■■■■■■■■■■■ 100%',
				'$: > Booting console                ■■■■■■■■■■■ 100%',
				'$:',
				'$: > Welcome to My website version 1.3a',
				'$:',
				'$: > Hello friend. I am David..',
				'$: I can has matrix?',
				'$: > buffering matrix... 20%',
				'$: > buffering matrix... 66%',
				'$: > buffering matrix... 100%',
				'$: > So, would you like a red or blue pill?',
			],
			scale: 0,
			loadingLines: [
				'2 days 13 hours 46 minutes',
				'2 seconds',
				'0 seconds',
			],
			index: 0,
			renderLinesTimeout: null,
			animateBar: false,
			delayTransition: true,
		}
	},
	computed: {
		estimated() {
			if (this.scale < 0.5) {
				return this.loadingLines[0]
			} else if (this.scale < 1) {
				return this.loadingLines[1]
			} else {
				return this.loadingLines[2]
			}
		},
	},
	methods: {
		renderLines() {
			if (!this.loading) return
			if (this.$refs.terminal) {
				const li = `<li class="line">${this.lines[this.index]}</li>`
				this.$refs.terminal.insertAdjacentHTML('beforeend', li)
			} else {
				this.index = 0
				return
			}
			if (this.index === this.lines.length - 1) {
				this.index = 0
				return
			}
			if (this.index % 2) {
				this.scale += 0.15
			}
			this.index++
			this.renderLinesTimeout = setTimeout(() => {
				this.renderLines()
			}, 50)
		},
		start() {
			this.$store.commit('SET_PAGE_LOADING', true)
			// this.renderLines()

			this.loading = true

			this.animateBar = true
			this.$refs.bar.addEventListener(
				'animationstart',
				() => {
					this.renderLines()
				},
				{ once: true }
			)
			this.$refs.bar.addEventListener(
				'animationend',
				this.onAnimationEnd,
				{ once: true }
			)

			this.$refs.containerRef.addEventListener(
				'transitionend',
				this.onTransitionContainerEnd
			)
		},
		finish() {},
		onAnimationEnd() {
			this.delayTransition = false
			this.loading = false
		},
		onTransitionContainerEnd(e) {
			if (this.loading) return
			this.resetLoadingComponent()
		},
		resetLoadingComponent() {
			this.loading = false
			this.animateBar = false
			this.index = 0
			this.scale = 0
			this.$refs.terminal.innerHTML = ''
			this.$refs.containerRef.removeEventListener(
				'transitionend',
				this.onTransitionContainerEnd
			)
			clearTimeout(this.renderLinesTimeout)
			this.$store.commit('SET_PAGE_LOADING', false)
			// setTimeout(() => {

			// })
		},
	},
}
</script>

<style lang="scss" scoped>
$bar-border: #0a0213;
$bar-color: #46009e;

.loading-container {
	pointer-events: none;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: var(--navbar-color);
	z-index: 900;
}
.loading {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	// background: #10031e;
	background: var(--navbar-color);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	transform: translateX(0) scale(0.8);
	overflow: hidden;
}

.terminal {
	font-family: 'VT323', monospace;
	color: #6637eb21;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	font-style: normal;
	font-weight: normal;
	font-size: 1.4rem;
	margin: 1rem;
	list-style-type: none;
	white-space: pre;
	padding: 0;
	pointer-events: none;
	z-index: -1;
}

.loading-title {
	font-family: 'Press Start 2P', cursive;
	text-transform: uppercase;
	font-size: 1.1rem;
	font-weight: normal;
	color: #ffffff;
	display: block;
	margin-bottom: 1rem;
}
.loading-bar {
	position: relative;
	display: block;
	width: 280px;
	height: 25px;
	margin-bottom: 1rem;
	background: #16062b;
	box-shadow: $bar-border 0px 0.4em, $bar-border 0px -0.4em,
		$bar-border 0.4em 0px, $bar-border -0.4em 0px;
	overflow: hidden;

	.bar {
		position: absolute;
		left: 0;
		top: 0;
		background: $bar-color;
		width: 100%;
		height: 100%;
		transform: scaleX(0);
		transform-origin: left;
		// transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

		&.loading-animation {
			animation: loadingAnim 1s forwards;
			animation-delay: 500ms;
		}

		@keyframes loadingAnim {
			0% {
				transform: scaleX(0);
			}
			10% {
				transform: scaleX(0.2);
			}
			30% {
				transform: scaleX(0.2);
			}
			50% {
				transform: scaleX(0.5);
			}
			60% {
				transform: scaleX(0.5);
			}
			80% {
				transform: scaleX(0.7);
			}
			100% {
				transform: scaleX(1);
			}
		}

		&::after {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 50%;
			background: lighten($bar-color, 15);
		}
	}
}
.loading-time {
	color: #9dbae4;
	font-size: 0.7rem;
	width: 280px;
	position: absolute;
}

.loadingComponent-enter-active,
.loadingComponent-leave-active {
	transition: transform 300ms cubic-bezier(0.55, 0.055, 0.675, 0.19),
		opacity 300ms ease;
	// transition-delay: 200ms;
}
// .loadingComponent-enter-active {
// 	transition-delay: 400ms;
// }
.loadingComponent-enter,
.loadingComponent-leave-to {
	opacity: 0;
	transform: translateY(-10%);
}

@media (max-width: 500px) {
	.terminal {
		font-size: 1rem;
	}
}

.loading-container {
	transition: transform 300ms cubic-bezier(0.55, 0.055, 0.675, 0.19),
		opacity 300ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
	opacity: 0;
	transform: translateY(-10%);
}
.delayTransition {
	transition-delay: 400ms;
}
.show-loading {
	opacity: 1;
	transform: translateY(0);
}
</style>
