<template>
	<div class="navigation-links" :class="{ 'links-hidden': showcase }">
		<!-- ***********    HOME link  ****************** -->
		<div class="link home-icon" :class="{ disabled: loading }">
			<nuxt-link to="/">
				<HomeIcon />
				<div class="link-name">Home</div>
			</nuxt-link>
		</div>

		<!-- ***********    ABOUT ME link  ****************** -->
		<div class="link about-icon" :class="{ disabled: loading }">
			<nuxt-link to="/about">
				<AboutIcon />
				<div class="link-name">About</div>
			</nuxt-link>
		</div>

		<!-- ***********    PROJECTS link  ****************** -->
		<div class="link projects-icon" :class="{ disabled: loading }">
			<nuxt-link to="/projects">
				<ProjectsIcon />
				<div class="link-name">projects</div>
			</nuxt-link>
		</div>

		<!-- ***********    CONTACT link  ****************** -->
		<div class="link contact-icon" :class="{ disabled: loading }">
			<nuxt-link to="/contact">
				<ContactIcon />
				<div class="link-name">Contact</div>
			</nuxt-link>
		</div>

		<!-- ***********    Blogs link  ****************** -->
		<div class="link blog-icon" :class="{ disabled: loading }">
			<nuxt-link to="/blogs">
				<!-- <ContactIcon /> -->
				<div class="hash">#</div>
				<div class="link-name">Blogs</div>
			</nuxt-link>
		</div>
	</div>
</template>

<script>
import HomeIcon from '~/assets/images/svg/HomeIcon.svg'
import AboutIcon from '~/assets/images/svg/AboutIcon.svg'
import ProjectsIcon from '~/assets/images/svg/ProjectsIcon.svg'
import ContactIcon from '~/assets/images/svg/ContactIcon.svg'

export default {
	components: {
		HomeIcon,
		AboutIcon,
		ProjectsIcon,
		ContactIcon,
	},
	props: {
		loading: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		showcase() {
			return this.$store.state.showcase
		},
	},
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/_colors';
.disabled {
	pointer-events: none;
	opacity: 0.5;
	filter: grayscale(50%);
}
.navigation-links {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	// background: #1a0536;
	background: transparent;
	// width: 4.4rem;
	width: 80px;
	pointer-events: all;
	position: fixed;
	transform: translate3D(0, 0, 0);
	left: 0;
	transition: transform 300ms;

	.link {
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 14px;

		svg {
			width: 37px;
			height: auto;
		}
	}
	.home-icon svg {
		width: 32px;
	}
	.contact-icon svg {
		width: 30px;
	}
	.projects-icon svg {
		width: 32px;
	}
	.link:last-child {
		margin-bottom: 0;
	}

	.blog-icon {
		margin-top: 30px;
	}

	.link-name {
		font-family: 'Press Start 2P', cursive;
		font-size: 12px;
		text-transform: uppercase;
		color: #fff;
		padding-top: 0.2rem;
		opacity: 0;
		transform: scale(0.7);

		@media (max-width: 800px) {
			display: none;
		}
	}
	.blog-icon .link-name {
		opacity: 1;
	}
	.hash {
		font-family: 'Press Start 2P', cursive;
		color: var(--select-color);
	}
}

// ------- AKTIV KLASSA
.nuxt-link-exact-active {
	.link-name {
		color: var(--select-color);
		opacity: 1;
	}
}

/* --------- HOVERY----------- */
@media (min-width: 800px) {
	.link:hover,
	.link:focus {
		.link-name {
			// color: #34f8b1;
			color: #fff;
			opacity: 1;
		}
	}
	// pri hoverovani nech neblika to lomitko
	.link:hover .link-name::after {
		display: none;
	}

	.blog-icon:hover {
		.link-name {
			// text-decoration: underline;
		}
		.hash {
			color: #ffb601;
		}
	}
}

// MEDIA QUERIES -------------
@media (max-width: 800px) {
	.navigation-links {
		flex-direction: row;
		// background: var(--navbar-color);

		width: 100%;
		height: 80px;
		bottom: 0;
		left: unset;

		.link {
			position: relative;
			margin-bottom: 0rem;
			margin: 0 12px;
		}
		.link-name {
			position: absolute;
			left: 50%;
			transform: translateX(-50%) scale(0.8);
		}
		.link-name::after {
			display: none;
		}
		// .link:focus,
		// .link:hover {
		// 	.link-name {
		// 		// color: #34f8b1;
		// 		color: #0af0f0;
		// 		opacity: 0;
		// 	}
		// }
		.blog-icon {
			transform: translateX(11px);
		}
	}
}
@media (max-width: 620px) {
	.navigation-links.links-hidden {
		transform: translateX(100%);
	}
}
</style>
