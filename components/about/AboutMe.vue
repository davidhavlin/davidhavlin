<template>
	<div class="box-container" :class="{ 'skill-page': nextPage }">
		<div ref="box" class="box-content">
			<h2 v-show="!nextPage" class="about-title">About me</h2>
			<h2 v-show="nextPage" class="skills-title">Skills</h2>
			<div class="box-text">
				<p v-show="!nextPage">
					Vyučeny grafik, ale vždy ma to viac ťahalo k programovaniu a
					že som sa v tom našiel. <br />
					Osoba s citom pre detail, fanúšik prírody, hier, seriálov a
					kinematografie.
				</p>
				<p v-show="nextPage">
					Zameriavam sa zatiaľ na
					<strong>frontend</strong> development: <br />
					<span>
						HTML, CSS/Scss, JavaScript(ES6), TypeScript, Vue.js,
						Nuxt.js, Quasar, React, Git(GitHub), Docker
					</span>
					<br />
					<br />
					Ale čoraz viac zabŕdam do <strong>backendu</strong>:<br />
					<span>
						Node.js, Express.js, Postgresql
					</span>
				</p>
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
$border-color-skill: #7206d5;
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
	margin-top: -10rem;
	z-index: 2;
	pointer-events: none;
	overflow: hidden;
}

.about-title,
.skills-title {
	text-align: left;
	font-family: 'Press Start 2P', cursive;
	font-style: normal;
	font-weight: normal;
	color: #34b1f8;
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
			color: #fb6488;
		}
	}
}

.box-text {
	// $borderColor: #5903e2;
	$borderColor: #1e053a;
	position: relative;
	font-family: 'IBM Plex Mono', monospace;
	font-weight: normal;
	background: #16062d;
	color: #fff;
	width: 25rem;
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
		background: #4e0277;
		box-shadow: $border-color-skill 0px 0.4em,
			$border-color-skill 0px -0.4em, $border-color-skill 0.4em 0px,
			$border-color-skill -0.4em 0px;
	}
}

@media (max-width: 660px) {
	.box-container {
		align-items: center;
		padding-left: 0;
		padding-top: 4rem;
	}
}
@media (max-width: 430px) {
	.box-content {
		padding: 1rem;
	}
	.box-text {
		width: 100%;
		padding: 1rem;
	}
}
</style>
