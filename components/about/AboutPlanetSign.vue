<template>
	<div ref="wrapper" class="wrapper" :class="{ closed }">
		<div
			ref="sign"
			class="sign"
			:class="{ dragging: dragging, closed }"
			:style="{ top: elTop, left: elLeft }"
		>
			<div
				class="bar"
				@mousedown.prevent="onDragStart"
				@touchstart.prevent="onDragStart"
			>
				<div
					id="exit"
					class="exit"
					@click.stop="closed = true"
					@touchstart.prevent="closed = true"
				>
					<span style="pointer-events: none;"
						><i class="fas fa-times"></i
					></span>
				</div>
			</div>
			<div class="heart">
				<svg
					width="172"
					height="143"
					viewBox="0 0 172 143"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						ref="heart"
						d="M35 3H32V6V18H20H17V21V33H6H3V36V64V67H6H17V79V82H20H32V93V96H35H47V108V111H50H61V123V126H64H76V137V140H79H93H96V137V126H107H110V123V111H122H125V108V96H137H140V93V82H151H154V79V67H166H169V64V36V33H166H154V21V18H151H140V6V3H137H108H105V6V18H94H91V21V33H81V21V18H78H67V6V3H64H35ZM130 40H118V31H142V54H133V43V40H130Z"
						fill="#FF002E"
						stroke="transparent"
						stroke-width="6"
					/>
				</svg>
			</div>
			<p>Click</p>
			<button @click.prevent="magicStars">ok</button>
		</div>
	</div>
</template>

<script>
const SIGN_SIZE = 130
const EL_TOP = '50%'
const EL_LEFT = '30%'
export default {
	data() {
		return {
			closed: false,
			posX: 0,
			posY: 0,
			elTop: EL_TOP,
			elLeft: EL_LEFT,
			targetEl: null,
			wrapper: null,
		}
	},
	computed: {
		dragging() {
			return this.$store.state.draggingSign
		},
	},
	mounted() {
		window.addEventListener(
			'resize',
			this.debounce(this.onWrapperResize, 200)
		)
	},
	destroyed() {
		window.removeEventListener('resize', this.onWrapperResize)
	},
	methods: {
		magicStars() {
			const top = Math.floor(
				Math.random() * Math.floor(window.innerHeight)
			)
			const left = Math.floor(
				Math.random() * Math.floor(window.innerWidth)
			)
			this.$store.commit('getElTop', top)
			this.$store.commit('getElLeft', left)

			this.$store.commit('runMagicStars')
		},

		onDragStart(e) {
			if (e.target.id === 'exit') return
			this.$store.commit('SET_DRAGGING_SIGN', true)
			this.targetEl = this.$refs.sign
			this.wrapper = this.targetEl.parentElement.getBoundingClientRect()
			if (e.type === 'touchstart') {
				this.posX = e.touches[0].clientX
				this.posY = e.touches[0].clientY
				document.addEventListener('touchmove', this.onDragMove)
				document.addEventListener('touchend', this.onDragEnd)
			} else {
				this.posX = e.clientX
				this.posY = e.clientY
				document.addEventListener('mousemove', this.onDragMove)
				document.addEventListener('mouseup', this.onDragEnd)
			}
		},
		onDragMove(e) {
			if (e.target.id === 'exit') return

			this.$store.commit('SET_DRAGGING_SIGN', true)

			const clientX =
				e.type === 'touchmove' ? e.touches[0].clientX : e.clientX
			const clienyY =
				e.type === 'touchmove' ? e.touches[0].clientY : e.clientY
			// ako daleko sa pohla mys
			const x = clientX - this.posX
			const y = clienyY - this.posY

			const top = this.targetEl.offsetTop + y
			const left = this.targetEl.offsetLeft + x

			// nastavit poziciu elementu
			this.elTop = this.checkIfOnEdge(top, 'y') + 'px'
			this.elLeft = this.checkIfOnEdge(left, 'x') + 'px'

			// znovu priradit poziciu mysi
			this.posX = clientX
			this.posY = clienyY
		},
		onDragEnd(e) {
			this.$store.commit('SET_DRAGGING_SIGN', false)
			this.targetEl = null
			if (e.type === 'touchend') {
				document.removeEventListener('touchmove', this.onTouchMove)
				document.removeEventListener('touchend', this.onTouchEnd)
			} else {
				document.removeEventListener('mousemove', this.onDragMove)
				document.removeEventListener('mouseup', this.onDragEnd)
			}
		},
		checkIfOnEdge(position, axis) {
			if (axis === 'x') {
				if (position <= 2) return 2
				else if (position >= this.wrapper.width - SIGN_SIZE - 3)
					return this.wrapper.width - SIGN_SIZE - 2
				else return position
			}
			if (axis === 'y') {
				if (position <= 2) return 2
				else if (position >= this.wrapper.height - SIGN_SIZE - 3)
					return this.wrapper.height - SIGN_SIZE - 2
				else return position
			}
		},
		onWrapperResize() {
			this.elTop = EL_TOP
			this.elLeft = EL_LEFT
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
	},
}
</script>

<style lang="scss" scoped>
.wrapper {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	// z-index: 1000000000000;
	pointer-events: none;
}
.sign {
	// position: absolute;
	position: relative;
	pointer-events: initial;
	width: 130px;
	height: 130px;
	background: #5903e2;
	color: #57c5ff;
	font-style: normal;
	font-weight: normal;
	font-family: 'Press Start 2P', cursive;
	padding: 0.2rem;
	line-height: 13px;
	border-radius: 2px;
	text-align: center;
	cursor: default;
	user-select: none;

	&.dragging {
		outline: 2px solid white;
	}

	.bar {
		cursor: move;
		width: 100%;
		height: 15px;
		background: #390779;
		display: flex;
		justify-content: flex-end;
		padding: 0.1rem;

		.exit {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 20px;
			height: 100%;
			color: #fff;
			background: #e203ae;
			cursor: pointer;
			font-size: 13px;
		}
	}
	.heart {
		margin-top: 0.6rem;
		svg {
			width: 40px;
			height: auto;
			path {
				transition: all 0.5s ease;
				fill: #e203ae;
				stroke: #390779;
			}
		}
	}
	p {
		color: #fff;
		margin: 0.6rem 0rem;
		font-size: 12px;
		word-spacing: -5px;
		line-height: 17px;
		transform: scale(0.9);
	}
	button {
		cursor: pointer;
		margin-bottom: 0.5rem;
		color: #fff;
		background: #390779;
		padding: 0.2rem 1rem;
		border: none;
		border-radius: 2px;
		font-size: 12px;
		font-weight: 600;
		font-family: arial;
		// text-transform: uppercase;
		&:hover {
			outline: 2px solid #fff;
			color: #fff;
		}
	}
}
.closed {
	transform: translate(30%, 30%) !important;
	z-index: 1 !important;
}
.closed .sign {
	transform: scale(0.01) !important;
	// transition: transform 700ms cubic-bezier(0.785, 0.135, 0.15, 0.86);
	z-index: 1 !important;
}
</style>
