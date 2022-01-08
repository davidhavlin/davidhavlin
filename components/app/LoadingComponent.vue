<template>
	<transition name="loadingComponent">
		<div v-if="loading" class="loading-container">
			<div class="loading">
				<ul ref="terminal" class="terminal"></ul>
				<div>
					<h1 class="loading-title">loading</h1>
					<div class="loading-bar">
						<div ref="bar" class="bar"></div>
					</div>
					<div class="loading-time">
						Estimated time remaining: {{ estimatedTime() }}
					</div>
				</div>
			</div>
		</div>
	</transition>
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
			loadingLines: ['2 days 13 hours 46 minutes', '2 seconds'],
			index: 0,
		}
	},
	watch: {
		loading(newValue, oldValue) {
			if (newValue) {
				setTimeout(() => {
					this.renderLines()
				}, 300)
			} else {
				this.index = 0
				this.scale = 0
			}
		},
	},

	methods: {
		renderLines() {
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
				this.loadingBar()
			}
			this.index++
			setTimeout(() => {
				this.renderLines()
			}, 50)
		},
		loadingBar() {
			this.$refs.bar.style.transform = `scaleX(${this.scale})`
		},
		estimatedTime() {
			if (this.scale < 1) {
				return this.loadingLines[0]
			} else {
				return this.loadingLines[1]
			}
		},
		start() {
			setTimeout(() => {
				this.loading = true
			}, 400)
		},
		finish() {
			setTimeout(() => {
				this.index = 0
				this.scale = 0
				this.loading = false
			}, 1600)
		},
	},
}
</script>

<style lang="scss" scoped>
$bar-border: #0a0213;
$bar-color: #46009e;

.loading-container {
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
		transform: scaleX(0.1);
		transform-origin: left;
		transition: transform 0.3s ease;

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
	transition: all 300ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
.loadingComponent-enter {
	opacity: 0;
	transform: translateY(-10%);
}
.loadingComponent-leave-to {
	transform: translateY(-10%);
	opacity: 0;
}

@media (max-width: 500px) {
	.terminal {
		font-size: 1rem;
	}
}
</style>
