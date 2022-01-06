<template>
	<transition name="solar">
		<div v-show="nextPage" class="solar-system">
			<div class="sun" :class="{ chargedSun: enoughStars }">
				<div class="icon js" @click="loveJavascript">
					<img
						:src="require('@/assets/images/software/js.png')"
						alt="javascript"
					/>
				</div>
				<div class="planet html">
					<div class="icon">
						<img
							:src="require('@/assets/images/software/html5.png')"
							alt="html"
						/>
					</div>
				</div>
				<div class="planet css">
					<div class="icon icon-css">
						<img
							:src="require('@/assets/images/software/css.png')"
							alt="css"
						/>

						<div class="sub-planet">
							<div class="sub-icon">
								<img
									:src="
										require('@/assets/images/software/sass.png')
									"
									alt="sass"
								/>
							</div>
						</div>
					</div>
				</div>
				<div class="planet react">
					<div class="icon">
						<img
							:src="require('@/assets/images/software/react.png')"
							alt="react"
						/>
					</div>
				</div>
				<div class="planet vue">
					<div class="icon icon-vue">
						<img
							:src="require('@/assets/images/software/vue.png')"
							alt="vue"
						/>
						<div class="sub-planet">
							<div class="sub-icon">
								<img
									:src="
										require('@/assets/images/software/nuxt.png')
									"
									alt="nuxt"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="comet">
				<img
					:src="require('@/assets/images/software/github.png')"
					alt="github"
				/>
			</div>
		</div>
	</transition>
</template>

<script>
// const galaxy = [{ name: 'html', icon: '', subPlanets: [] }] // TODO rework
export default {
	props: {
		nextPage: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		enoughStars() {
			return this.$store.state.isEnoughStars
		},
	},
	methods: {
		loveJavascript(e) {
			const coords = this.offset(e.target)
			this.$store.commit('getElTop', coords.top)
			this.$store.commit('getElLeft', coords.left)

			this.$store.commit('runMagicStars')
		},
		offset(el) {
			const rect = el.getBoundingClientRect()
			const scrollLeft =
				window.pageXOffset || document.documentElement.scrollLeft
			const scrollTop =
				window.pageYOffset || document.documentElement.scrollTop
			return {
				top: rect.top + scrollTop,
				left: rect.left + scrollLeft,
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.solar-system {
	position: absolute;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
}
.comet {
	position: absolute;
	top: -30px;
	right: -30px;
	animation: comet 12s infinite linear;
	animation-delay: 6s;

	img {
		width: 30px;
		height: auto;
		animation: rotate 15s infinite linear;
	}

	@keyframes comet {
		30%,
		100% {
			transform: translate(-80vw, calc(100vh + 100%));
		}
	}
}
.sun {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 600px;
	height: 600px;
	border-radius: 50%;
	right: 15%;

	&::after {
		content: '';
		position: absolute;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--main-bg-color-darker);
		border: 1px solid#140427;
		animation: pulse 1s infinite ease;
		z-index: -1;
	}

	@keyframes pulse {
		from {
			transform: scale(4);
		}
	}
}
.chargedSun {
	&::after {
		display: none;
	}
	&::before {
		content: '';
		position: absolute;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background: #f7df1e;
		animation: pulsingSun 1s infinite ease;
		box-shadow: 0px 0px 23px 12px #f7c01e52;
		z-index: -1;
	}
	@keyframes pulsingSun {
		0%,
		100% {
			transform: scale(1.3);
		}
		50% {
			transform: scale(1);
		}
	}
}
.icon {
	position: absolute;
	top: -17px;
	left: calc(50% - 17px);
}
.js {
	position: relative;
	top: 0;
	left: 0;
	background: #f7df1e;
	padding: 0.4rem;
	border-radius: 50%;
	pointer-events: all;
	cursor: pointer;
	transition: transform 0.3s ease;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		transform: scale(1.2);
	}

	img {
		pointer-events: none;
		animation: rotate 20s infinite linear;
		width: 35px;
	}
}

.planet {
	position: absolute;
	width: 170px;
	height: 170px;
	border-radius: 50%;
	border: 1px solid #7206d545;
	animation: rotate 20s infinite linear;
	pointer-events: none;
}

.icon {
	img {
		width: 30px;
		height: auto;
		animation: rotate 25s infinite linear;
	}
}
.html {
	animation-duration: 27s;
}

.css {
	width: 320px;
	height: 320px;
	animation-duration: 15s;
}

.react {
	width: 470px;
	height: 470px;
	animation-duration: 17s;
}
.vue {
	width: 620px;
	height: 620px;
	animation-duration: 25s;
}
.icon-vue,
.icon-css {
	left: calc(50% - 50px);
	top: -50px;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	// background: yellow;
	border: 1px solid #7206d540;
	display: flex;
	justify-content: center;
	align-items: center;
	animation: rotate 20s infinite linear;
}
.sub-planet,
.sub-planet-second {
	img {
		width: 22px;
		animation: rotate 20s infinite linear;
	}

	position: absolute;
	top: -11px;
	left: calc(50% - 11px);
}
.sub-planet-second {
	top: auto;
	bottom: -11px;
}
@keyframes rotate {
	to {
		transform: rotate(360deg);
	}
}

.solar-enter-active {
	transition: opacity 2s ease;
	transition-delay: 1s;
}
.solar-leave-active {
	transition: opacity 1s ease;
	transition-delay: none;
}
.solar-enter-to,
.solar-leave {
	opacity: 1;
}
.solar-leave-to,
.solar-enter {
	opacity: 0;
}

@media (max-width: 600px) {
	.sun {
		transform: scale(0.7);
	}
}
</style>
