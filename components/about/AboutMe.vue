<template>
	<div class="box-container" :class="{ 'skill-page': nextPage }">
		<div ref="box" class="box-content">
			<h2 v-show="!nextPage" class="about-title">About me</h2>
			<h2 v-show="nextPage" class="skills-title">Skills</h2>
			<div class="box-text">
				<p v-show="!nextPage">
					Vyučený grafik, ale vždy ma to viac ťahalo k programovaniu a
					že som sa v tom našiel. <br />
					Osoba s citom pre detail, fanúšik prírody, hier, seriálov a
					kinematografie.
				</p>
				<div v-show="nextPage" class="skill-content">
					<div v-if="showMore">
						<p>
							Zameriavam sa hlavne na
							<strong>frontend</strong> development: <br />
						</p>
						<ul>
							<li>HTML, CSS/Scss</li>
							<li>JavaScript(ES6), TypeScript</li>
							<li>Vue(Vue 3, Quasar, Nuxt.js, Vuex)</li>
							<li>React(Redux, React native)</li>
							<li>Git(GitHub, BitBucket)</li>
						</ul>
						<p class="d-mt-md">
							Ale čoraz viac zabŕdam do
							<strong>backendu</strong>:<br />
						</p>

						<ul>
							<li>Node.js(Express.js, Adonis.js)</li>
							<li>Postgresql, Prisma 2</li>
							<li>Docker</li>
						</ul>
					</div>
					<div v-else>...</div>
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
export default {
	props: {
		nextPage: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			showMore: true,
		}
	},
	mounted() {
		this.$refs.box.addEventListener('animationend', this.boxFinished, {
			once: true,
		})
	},
	methods: {
		boxFinished(e) {
			this.$refs.box.classList.add('box-finished')
		},
	},
}
</script>

<style lang="scss" scoped>
$border-color-about: #5903e2;
// $border-color-skill: #7206d5;
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
	// margin-top: -10rem;
	z-index: 2;
	pointer-events: none;
	overflow: hidden;
}

.box-content {
	position: absolute;
	top: 15%;
	pointer-events: initial;
	max-width: 420px;
	// transition: all 1s;
}

.about-title,
.skills-title {
	text-align: left;
	font-family: 'Press Start 2P', cursive;
	font-style: normal;
	font-weight: normal;
	color: #e202ae;
	margin-bottom: 1rem;
	transition: all 2s ease;

	animation: slideInUp;
	animation-duration: 0.5s;
}
.skills-title {
	color: #df1041;
}

.box-finished {
	.box-text p {
		opacity: 1;
		animation: fadeIn;
		animation-duration: 0.3s;

		strong {
			color: #fff;
		}
		span {
			display: block;
			color: #f7ab1e;
		}
	}
	ul {
		margin-top: 10px;
		color: #f7ab1e;
	}
}

.box-text {
	$borderColor: #5903e2;
	// $borderColor: #1e053a;
	position: relative;
	font-family: 'IBM Plex Mono', monospace;
	font-weight: normal;
	background: #391779;
	color: #fff;
	padding: 1.5rem;
	box-shadow: $borderColor 0px 0.4em, $borderColor 0px -0.4em,
		$borderColor 0.4em 0px, $borderColor -0.4em 0px;
	transition: background 2s ease;
	p {
		opacity: 0;
	}
}
.skill-page {
	.box-text {
		// background: #4e0277;
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

// @media (max-width: 660px) {
// 	.box-container {
// 		align-items: center;
// 		padding-left: 0;
// 		padding-top: 4rem;
// 	}
// }
@media (max-width: 430px) {
	.box-content {
		padding: 7px;
		top: 5%;
	}
	.box-text {
		width: 100%;
		padding: 1rem;
	}
}
</style>
