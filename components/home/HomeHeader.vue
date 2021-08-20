<template>
	<header ref="header" class="home-header">
		<div class="header">
			<h1 ref="friend"></h1>
			<div ref="dots" class="dots"></div>
		</div>
		<div ref="subHeader" class="home-sub-header">
			<p>I am David</p>
			<p>A Web Developer</p>
		</div>
	</header>
</template>

<script>
export default {
	data() {
		return {
			text: 'hello friend',
			dots: '...',
			timeout: null,
		}
	},
	mounted() {
		this.timeout = setTimeout(() => {
			this.helloFriend()
			this.$refs.subHeader.style.opacity = 1
		}, 2000)
	},
	destroyed() {
		clearTimeout(this.timeout)
	},
	methods: {
		helloFriend() {
			const array = this.text.split('')
			array.forEach((letter, index) => {
				setTimeout(() => {
					this.createSpan(letter)
					if (index === array.length - 1) this.threeDots()
				}, 100 * (index + 1))
			})
		},

		createSpan(letter) {
			if (!this.$refs.friend) return
			const span = document.createElement('span')
			span.classList.add('letter', 'letter-anim')
			span.textContent = letter
			this.$refs.friend.appendChild(span)

			span.addEventListener('animationend', this.removeClass, {
				once: true,
			})
			span.addEventListener('mouseenter', this.letterBounce)
		},

		letterBounce(e) {
			const span = e.target
			span.classList.add('letter-bounce')

			span.addEventListener(
				'animationend',
				() => {
					span.classList.remove('letter-bounce')
				},
				{ once: true }
			)
		},
		removeClass(e) {
			e.target.classList.remove('letter-anim')
		},

		threeDots() {
			const dotsArray = this.dots.split('')
			dotsArray.forEach((dot, index) => {
				setTimeout(() => {
					if (!this.$refs.dots) return
					this.$refs.dots.innerHTML += dot
					if (index >= dotsArray.length - 1) {
						setTimeout(() => {
							this.$refs.dots.innerHTML = ''
							this.threeDots()
						}, 700)
					}
				}, 700 * (index + 1))
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.home-header {
	opacity: 1;
	margin-bottom: 6rem;
	padding: 1rem;
	pointer-events: initial;

	.header {
		position: relative;
		height: 72px;
		margin-bottom: 1rem;
		z-index: 1;
		h1 {
			font-size: 2.25em;
			width: 225px;
			color: #34b1f8;
			text-transform: uppercase;
		}
		.dots {
			position: absolute;
			font-size: 1.5em;
			color: #34b1f8;
			bottom: 0px;
			left: 216px;
		}
	}

	.home-sub-header {
		opacity: 0;
		position: relative;
		color: #9dbae4;
		font-size: 1.25em;
		z-index: 1;
		transition: opacity 1s ease;

		p:first-child {
			margin-bottom: 4px;
		}
	}
}

@media (max-height: 600px) {
	.home-header {
		margin-bottom: 2rem;
	}
}
</style>
