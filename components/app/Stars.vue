<template>
	<div v-if="showStars" ref="sky" class="sky">
		<div class="sky-overflow" :class="{ whileLoading: loading }">
			<div class="sky-container" :class="{ moveStars: moveStars }">
				<transition-group name="stars">
					<div
						v-for="star in stars"
						:key="star.id"
						class="star"
						:class="star.size"
						:style="{ left: star.left, top: star.top }"
					></div>
				</transition-group>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		showStars: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			clicked: 0,
			showSky: false,
			starId: 0,
			stars: [],
			top: 150,
			left: 350,
			gap: 15,
			timeout: null,
			wInnerWidth: null,
			wInnerHeight: null,
			// prettier-ignore
			movement: [
                '=','>','>','v','>','v','>','^','>','^','>',
                '>','v','>','v','>','v','v','<','v','<','v',
                '<','v','<','v','<','v','<','^','<','^','<',
                '^','<','^','<','^','<','^','^','>','^','>',
            ]
		}
	},
	computed: {
		runMagicStars() {
			return this.$store.state.magicStars
		},
		moveStars() {
			return this.$store.state.moveStars
		},
		loading() {
			return this.$store.state.pageLoading
		},
	},
	watch: {
		runMagicStars(newValue, oldValue) {
			this.magicStars()
		},
	},

	mounted() {
		this.wInnerWidth = window.innerWidth
		this.wInnerHeight = window.innerHeight
		this.fillStarsOnStart()
		this.autoAddingStars()
		window.addEventListener('resize', this.debounce(this.handleResize, 500))
	},
	methods: {
		fillStarsOnStart() {
			for (let i = 0; i < 50; i++) {
				this.addStar()
			}
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
		handleResize() {
			this.wInnerWidth = window.innerWidth
			this.wInnerHeight = window.innerHeight
			clearTimeout(this.timeout)
			this.autoAddingStars()
		},
		addStar() {
			const size = this.starRandomize()
			const left = this.starPosition().left
			const top = this.starPosition().top

			this.stars.push({
				id: this.starId,
				size,
				top,
				left,
			})
			this.starId++
		},
		starRandomize() {
			const random = Math.floor(Math.random() * 3)
			if (random === 2) {
				return 'large'
			} else if (random === 1) {
				return 'middle'
			} else {
				return 'little'
			}
		},

		starPosition() {
			const randomWidth = Math.floor(Math.random() * this.wInnerWidth)
			const randomHeight = Math.floor(Math.random() * this.wInnerHeight)
			return {
				left: randomWidth + 'px',
				top: randomHeight + 'px',
			}
		},

		autoAddingStars() {
			// if (!document.hasFocus()) return
			this.timeout = setTimeout(() => {
				if (this.stars.length >= this.movement.length) {
					this.$store.commit('enoughStars', true)
				}
				if (this.stars.length >= 50) {
					this.stars.splice(0, 1)
				}

				this.addStar()
				this.autoAddingStars()
			}, 200)
		},

		magicStars() {
			if (this.stars.length < 46) return
			this.top = this.$store.state.elTop - 40
			this.left = this.$store.state.elLeft

			const starsCount = []
			this.movement.map((move, index) => starsCount.push(index + 2))

			this.movement.forEach((move) => {
				const number = Math.floor(Math.random() * starsCount.length)
				const randomNum = starsCount[number]

				starsCount.splice(number, 1)

				if (move === '>') {
					Object.assign(this.stars[randomNum], this.starToRight())
				} else if (move === 'v') {
					Object.assign(this.stars[randomNum], this.starToBottom())
				} else if (move === '<') {
					Object.assign(this.stars[randomNum], this.starToLeft())
				} else if (move === '^') {
					Object.assign(this.stars[randomNum], this.starToTop())
				} else {
					Object.assign(this.stars[randomNum], {
						top: this.calculateTop('='),
						left: this.calculateLeft('='),
					})
				}
			})
			switch (this.clicked) {
				case 0:
					this.top = 240
					this.left = 750
					this.clicked++
					break
				case 1:
					this.top = 540
					this.left = 170
					this.clicked++

					break
				case 2:
					this.top = 150
					this.left = 350
					this.clicked = 0

					break
			}
		},

		calculateTop(sign) {
			if (sign === '+') {
				this.top += this.gap
				return this.top + 'px'
			} else if (sign === '-') {
				this.top -= this.gap
				return this.top + 'px'
			} else {
				return this.top + 'px'
			}
		},
		calculateLeft(sign) {
			if (sign === '+') {
				this.left += this.gap
				return this.left + 'px'
			} else if (sign === '-') {
				this.left -= this.gap
				return this.left + 'px'
			} else {
				return this.left + 'px'
			}
		},

		starToRight() {
			return {
				top: this.calculateTop('='),
				left: this.calculateLeft('+'),
			}
		},

		starToBottom() {
			return {
				top: this.calculateTop('+'),
				left: this.calculateLeft('='),
			}
		},

		starToLeft() {
			return {
				top: this.calculateTop('='),
				left: this.calculateLeft('-'),
			}
		},

		starToTop() {
			return {
				top: this.calculateTop('-'),
				left: this.calculateLeft('='),
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.sky {
	pointer-events: none;
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 0;
	overflow: hidden;
	transition: all 1s ease-in-out;
}
.sky-container {
	width: 100%;
	height: 100%;
	transition: transform 1s ease;
}
.sky-overflow {
	width: 100%;
	height: 100%;
	transition: all 1s ease;
}
.moveStars {
	transform: translateX(-25px);
}
.whileLoading {
	transform: scale(7.5);
	opacity: 0.2;
}
.star {
	position: absolute;
	// background: rgb(0, 247, 255);
	background: rgb(0, 187, 255);
	z-index: 0;
	display: inline-block;
	transition: all 1s ease;
}

.little,
.middle,
.large {
	width: 1px;
	height: 1px;
	animation: star 1s infinite ease;
	animation-delay: 300ms;
}
.middle {
	animation-delay: 100ms;
}
.large {
	width: 2px;
	height: 2px;
	animation-delay: 500ms;
}

@keyframes star {
	0% {
		opacity: 0.6;
	}
	50% {
		opacity: 1;
		transform: scale(1.2);
	}
	100% {
		opacity: 0.6;
	}
}

.stars-enter-active,
.stars-leave-active {
	transition: all 1s;
}

.stars-enter,
.stars-leave-to {
	opacity: 0;
	background: #100317;
}
a {
	margin-left: 6rem;
	padding: 1rem;
	z-index: 100000;
	background: #fff;
	color: #000;
}
</style>
