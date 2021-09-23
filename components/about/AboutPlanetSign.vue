<template>
	<div>
		<div v-if="!closed" class="sign">
			<div class="bar">
				<div class="exit" @click="closed = true">
					<span><i class="fas fa-times"></i></span>
					<span>x</span>
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
			<p>Give me Like</p>
			<button @click.prevent="magicStars">ok</button>
		</div>
		<div class="stick"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			closed: false,
		}
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
	},
}
</script>

<style lang="scss" scoped>
.sign {
	width: 130px;
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

	.bar {
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

			// span {
			// 	display: block;
			// 	position: absolute;
			// 	font-weight: 700;
			// 	height: 18px;
			// }
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
		padding: 0.1rem 0.7rem;
		border: 1px solid #390779;
		font-size: 12px;
		font-weight: 600;
		font-family: arial;
		// text-transform: uppercase;
		&:focus {
			outline: none;
		}
		&:hover {
			border: 1px solid #00ddff;
			color: #fff;
		}
	}
}
.stick {
	display: none;
	position: absolute;
	width: 7px;
	height: 150px;
	background: #390779;
	left: 48%;
	bottom: -100px;
	z-index: -1;
}
</style>
