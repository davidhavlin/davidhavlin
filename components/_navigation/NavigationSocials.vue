<template>
	<div class="social-container">
		<div class="socials">
			<section
				ref="boxButton"
				class="social-box"
				@click="showIcons()"
				@mouseenter="openBox = true"
				@mouseleave="openBox = false"
			>
				<div v-if="notification" class="notification">
					<span>4</span>
				</div>
				<!-- ZATVORENA KRABICA -->
				<div v-show="!openBox && !socials" class="box">
					<ClosedBox />
				</div>
				<!-- OTVORENA PLNA KRABICA -->
				<div v-show="openBox && !socials" class="open-box">
					<OpenBoxFull />
				</div>
				<!-- OTVORENA PRAZDNA KRABICA -->
				<div v-show="socials" class="open-empty-box">
					<OpenBoxEmpty />
				</div>
				<!-- <div class="box-title">socials</div> -->
			</section>

			<section
				v-closable="{
					exclude: ['boxButton'],
					handler: 'onClose',
				}"
				class="social-icons"
			>
				<div class="icon facebook" :class="{ facebookIn: socials }">
					<a
						href="https://www.facebook.com/david.havlin.7"
						target="_blank"
					>
						<Facebook />
					</a>
				</div>
				<div class="icon twitter" :class="{ twitterIn: socials }">
					<a
						href="https://twitter.com/davidhavlindev"
						target="_blank"
					>
						<Twitter />
					</a>
				</div>
				<div class="icon youtube" :class="{ youtubeIn: socials }">
					<a
						href="https://www.youtube.com/user/davblender/featured"
						target="_blank"
					>
						<Youtube />
					</a>
				</div>
				<div class="icon github" :class="{ githubIn: socials }">
					<a href="https://github.com/davidhavlin" target="_blank">
						<Github />
					</a>
				</div>
			</section>
			<div class="circle" :class="{ bigCircle: socials }"></div>
		</div>
	</div>
</template>

<script>
import ClosedBox from '~/assets/images/svg/ClosedBox.svg'
import OpenBoxFull from '~/assets/images/svg/OpenBoxFull.svg'
import OpenBoxEmpty from '~/assets/images/svg/OpenBoxEmpty.svg'
import Facebook from '~/assets/images/svg/Facebook.svg'
import Youtube from '~/assets/images/svg/Youtube.svg'
import Twitter from '~/assets/images/svg/Twitter.svg'
import Github from '~/assets/images/svg/Github.svg'

export default {
	components: {
		ClosedBox,
		OpenBoxFull,
		OpenBoxEmpty,
		Facebook,
		Youtube,
		Twitter,
		Github,
	},
	data() {
		return {
			socials: false,
			openBox: false,
			notification: true,
		}
	},
	methods: {
		showIcons() {
			this.socials = !this.socials
			this.notification = false
		},
		onClose() {
			this.socials = false
		},
	},
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/_colors';
.social-container {
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	z-index: 1000;
	pointer-events: none;
	overflow: hidden;
}
.socials {
	margin-bottom: 15px;
	margin-left: 24px;
	position: fixed;
	bottom: 0;
	pointer-events: all;
}

// IKONKA KRABICE A VSETKO OKOLO NEJ
.social-box {
	position: relative;
	cursor: pointer;
	z-index: 1;

	.notification {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-family: 'Press Start 2P', cursive;
		font-size: 12px;
		position: absolute;
		top: -7px;
		left: 20px;
		background: #d90d3a;
		padding: 2px;
		border-radius: 3px;
		box-sizing: content-box;
		z-index: 1;
		pointer-events: none;

		span {
			transform: scale(0.9);
			display: block;
			margin-bottom: -1px;
		}
	}

	.box,
	.open-box,
	.open-empty-box {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;

		svg {
			width: 30px;
			height: 30px;
		}
	}

	.box-title {
		font-family: 'Rubik', sans-serif;
		font-size: 12px;
		font-weight: 500;
		color: $text-color;
		// text-transform: uppercase;
		padding: 0.2rem;
		padding-bottom: 0;
	}
}

// KRUH POD KRABICOU
.circle {
	width: 10px;
	height: 10px;
	position: absolute;
	background: #0b000f;
	transform: scale(1);
	border-radius: 50%;
	top: 13px;
	left: 10px;
	z-index: -1;
	transition: transform 0.5s cubic-bezier(0.68, -0.75, 0.265, 1.75);
}
.bigCircle {
	transform: scale(20.5) translate3d(0, 0, 0);
}
// VYSKAKUJUCE SOCIALS IKONKY
.social-icons {
	z-index: 0;
	.icon {
		position: absolute;
		transform: translate(11px, -50px) scale(0.5);
		opacity: 0;
		transition: all 0.5s cubic-bezier(0.68, -0.75, 0.265, 1.75);

		svg {
			width: 30px;
			height: 30px;
		}
	}

	.facebookIn,
	.twitterIn,
	.youtubeIn,
	.githubIn {
		opacity: 1;

		&:hover svg {
			transform: scale(1.1);
		}
	}

	.facebookIn {
		transform: translate(19px, -130px) scale(1);
	}
	.twitterIn {
		transform: translate(60px, -113px) scale(1);
		transition-delay: 100ms;
	}
	.youtubeIn {
		transform: translate(90px, -78px) scale(1);
		transition-delay: 200ms;
	}
	.githubIn {
		transform: translate(97px, -39px) scale(1);
		transition-delay: 300ms;
	}
}

@media (max-width: 800px), (max-height: 500px) {
	.socials {
		margin-bottom: 0rem;
		right: 0.7rem;
		top: 0.8rem;
		bottom: unset;
	}
	.social-box {
		transform: scaleX(-1);
		.box,
		.open-box,
		.open-empty-box {
			// background: #44179c;
			padding: 0.4rem;
			border-radius: 50%;
			border: 4px solid transparent;
			// box-shadow: -1px 1px 8px 1px #0b020f6e;
		}
		.box-title {
			display: none;
		}
		.notification {
			top: 2px;
			left: 8px;
			transform: scaleX(-1);
		}
	}
	.circle {
		width: 100vw;
		height: 87px;
		position: absolute;
		transform: scaleX(0.9);
		border-radius: 0;
		background: var(--navbar-color);
		top: -22px;
		left: 0;
		opacity: 0;
		transition: transform 0.5s cubic-bezier(0.68, -0.75, 0.265, 1.75);
		transform-origin: top right;
	}
	.bigCircle {
		opacity: 1;
		transform: scaleX(2);
	}

	.social-icons {
		.facebookIn {
			transform: translate(-45vw, -39px) scale(1);
		}
		.twitterIn {
			transform: translate(-35vw, -39px) scale(1);
			transition-delay: 100ms;
		}
		.youtubeIn {
			transform: translate(-25vw, -39px) scale(1);
			transition-delay: 200ms;
		}
		.githubIn {
			transform: translate(-15vw, -39px) scale(1);
			transition-delay: 300ms;
		}
	}
}
</style>
