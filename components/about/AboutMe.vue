<template>
	<div class="box-container" :class="{ 'skill-page': nextPage }">
		<div class="ghost-wrapper">
			<div ref="ghostAbout" class="ghost-about ghost-text">
				<SectionAbout />
			</div>
			<div ref="ghostSkill" class="ghost-about ghost-text">
				<SectionSkill />
			</div>
		</div>

		<div ref="box" class="box-content">
			<div
				ref="boxContent"
				class="box-text"
				:class="{ transitioning }"
				:style="{ width: box.width, height: box.height }"
			>
				<div class="title-wrapper">
					<transition name="title" mode="out-in">
						<h2 v-if="!nextPage" key="about" class="about-title">
							About me
						</h2>
						<h2 v-else key="skill" class="skills-title">
							Skills
						</h2>
					</transition>
				</div>
				<div v-if="!nextPage">
					<SectionAbout :transitioning="transitioning" />
				</div>
				<div v-else>
					<SectionSkill
						v-if="showMore"
						:transitioning="transitioning"
					/>
					<div v-else class="dots">...</div>
				</div>
				<div
					v-show="nextPage"
					class="close"
					@click="showMore = !showMore"
				>
					{{ showMore ? 'Schovať' : 'Ukázať' }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import SectionAbout from './SectionAbout.vue'
import SectionSkill from './SectionSkill.vue'
const FRONTEND_ITEMS = [
	'HTML, CSS/Scss',
	'JavaScript(ES6), TypeScript',
	'Vue(Vue 3, Quasar, Nuxt.js, Vuex)',
	'React(Redux, React native)',
	'Git(GitHub, BitBucket)',
]
const BACKEND_ITEMS = [
	'Node.js(Express.js, Adonis.js)',
	'Postgresql, Prisma 2',
	'Docker',
]
const SHOW_LESS_SIZE = {
	width: 144,
	height: 52,
}
export default {
	name: 'AboutMe',
	components: { SectionAbout, SectionSkill },
	FE_ITEMS: FRONTEND_ITEMS,
	BE_ITEMS: BACKEND_ITEMS,
	props: {
		nextPage: {
			type: Boolean,
			default: false,
		},
		pageLoading: {
			type: [Boolean, undefined],
			default: undefined,
		},
		sliding: {
			type: Boolean,
			default: undefined,
		},
	},
	data() {
		return {
			showMore: true,
			initialWidth: null,
			initialHeight: null,
			transitioning: false,
			box: {
				width: null,
				height: null,
			},
			aboutSize: {
				width: null,
				height: null,
			},
			skillSize: {
				width: null,
				height: null,
			},
		}
	},
	computed: {
		previousRoute() {
			return this.$store.state.previousRoute
		},
	},

	watch: {
		nextPage: {
			handler(skillPage) {
				if (skillPage) {
					if (!this.showMore) {
						this.transitioning = true
					}
					this.showMore
						? this.setSize('skillSize')
						: this.setSize('showLess')
				} else {
					this.setSize('aboutSize')
				}
			},
			// immediate: true,
		},
		showMore(show) {
			if (!show) {
				this.setSize('showLess')
				return
			}
			if (this.nextPage) {
				this.transitioning = true

				this.setSize('skillSize')
			}
		},
	},
	mounted() {
		this.$refs.box.addEventListener('animationend', this.boxFinished, {
			once: true,
		})
		this.$refs.boxContent.addEventListener(
			'transitionstart',
			this.onTransitionStart
		)
		this.$refs.boxContent.addEventListener(
			'transitionend',
			this.onTransitionEnd
		)
		this.calculateSizes('ghostAbout')
		this.calculateSizes('ghostSkill')
		this.setSize('aboutSize')
	},
	methods: {
		onTransitionStart(e) {
			// if (e.propertyName !== 'width' || this.showMore) return
			if (!['width', 'height'].includes(e.propertyName)) return
			this.transitioning = true
		},
		onTransitionEnd(e) {
			// if (e.propertyName !== 'width') return
			if (!['width', 'height'].includes(e.propertyName)) return
			this.transitioning = false
		},
		boxFinished() {
			this.$refs.box.classList.add('box-finished')
		},
		calculateSizes(container) {
			const { width, height } = this.$refs[
				container
			].getBoundingClientRect()
			if (container === 'ghostAbout') {
				this.aboutSize.width = width
				this.aboutSize.height = height
			} else {
				this.skillSize.width = width
				this.skillSize.height = height
			}
		},
		setSize(type) {
			if (type === 'showLess') {
				this.box.width = SHOW_LESS_SIZE.width + 'px'
				this.box.height = SHOW_LESS_SIZE.height + 'px'
				return
			}
			this.box.width = this[type].width + 'px'
			this.box.height = this[type].height + 'px'
		},
	},
}
</script>

<style lang="scss" scoped>
$border-color-about: #5903e2;
$border-color-skill: #f7ab1e;

.box-container {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 2;
	pointer-events: none;
	overflow: hidden;
}

.box-content {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	// max-width: 420px;
	line-height: 22px;

	// transition: all 1s;
}
.title-wrapper {
	position: absolute;
	top: 0;
	left: 2px;
	transform: translateY(-100%);
}
.about-title,
.skills-title {
	// position: absolute;
	text-align: left;
	font-family: 'Press Start 2P', cursive;
	font-style: normal;
	font-weight: normal;
	color: #e202ae;
	margin-bottom: 1rem;
	width: 1px;
	white-space: nowrap;
}
.title-enter-active {
	transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), opacity 300ms;
	transition-delay: 400ms;
}
.title-leave-active {
	transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94),
		opacity 120ms;
}
.title-enter, .title-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
	opacity: 0;
	transform: translateY(100%);
}
.skills-title {
	color: #df1041;
}

.box-text {
	position: absolute;
	left: 50%;
	top: 20%;
	transform: translateX(-50%);
	transition: height 400ms, width 400ms;
	pointer-events: initial;
}

.box-finished {
	.box-text p {
		opacity: 1;

		strong {
			color: #fff;
		}
	}
}

.box-text,
.ghost-text {
	$borderColor: #5903e2;
	// overflow: hidden;
	// position: relative;
	font-family: 'IBM Plex Mono', monospace;
	font-weight: normal;
	background: #391779;
	color: #fff;
	padding: 1.5rem;
	box-shadow: $borderColor 0px 0.4em, $borderColor 0px -0.4em,
		$borderColor 0.4em 0px, $borderColor -0.4em 0px;
	// transition: all 400ms ease;
	p {
		opacity: 0;
	}
}

.ghost-wrapper {
	visibility: hidden;
	pointer-events: none;
}
.ghost-text {
	max-width: 420px;
	line-height: 22px;
	transition: none;
	p {
		opacity: 1;
	}
}

.skill-page {
	.box-text {
		background: #0e031b;
		box-shadow: $border-color-skill 0px 0.4em,
			$border-color-skill 0px -0.4em, $border-color-skill 0.4em 0px,
			$border-color-skill -0.4em 0px;
	}
}

.close {
	position: absolute;
	bottom: 0;
	background: #f7ab1e;
	color: #0e031b;
	font-weight: bold;
	right: 0;
	font-size: 13px;
	padding: 1px 5px;
	cursor: pointer;

	&:hover {
		color: #fff;
	}
}

@media (max-width: 430px) {
	.box-content,
	.ghost-wrapper {
		padding: 7px;
		top: 40px;
	}
	.box-text,
	.ghost-text {
		width: 100%;
		padding: 1rem;
	}

	.box-text {
		top: 5%;
	}
}
</style>
