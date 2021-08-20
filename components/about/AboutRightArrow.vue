<template>
	<div class="right-arrow">
		<!-- <AboutInfoSign v-if="infoSign" /> -->
		<div v-if="infoSign" class="info">čo ovládam?</div>
		<svg
			width="70"
			height="94"
			viewBox="0 0 70 94"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M2.5 89L2.5 91.5L5 91.5L29 91.5L31.5 91.5L31.5 89L31.5 79.5L41 79.5L43.5 79.5L43.5 77L43.5 67.5L53 67.5L55.5 67.5L55.5 65L55.5 55.5L65 55.5L67.5 55.5L67.5 53L67.5 41L67.5 38.5L65 38.5L55.5 38.5L55.5 29L55.5 26.5L53 26.5L43.5 26.5L43.5 17L43.5 14.5L41 14.5L31.5 14.5L31.5 5L31.5 2.5L29 2.5L4.99999 2.50001L2.49999 2.50001L2.49999 5.00001L2.49999 17L2.49999 19.5L4.99999 19.5L14.5 19.5L14.5 29L14.5 31.5L17 31.5L26.5 31.5L26.5 41L26.5 43.5L29 43.5L38.5 43.5L38.5 50.5L29 50.5L26.5 50.5L26.5 53L26.5 62.5L17 62.5L14.5 62.5L14.5 65L14.5 74.5L5 74.5L2.5 74.5L2.5 77L2.5 89Z"
				fill="white"
				stroke="black"
				stroke-width="3"
			/>
		</svg>
	</div>
</template>

<script>
export default {
	props: {
		infoSign: {
			type: Boolean,
			default: true,
		},
	},
}
</script>

<style lang="scss" scoped>
.right-arrow {
	position: absolute;
	right: 1rem;
	z-index: 1;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;

	.info {
		position: absolute;
		font-family: 'Press Start 2P', cursive;
		top: 39px;
		left: -155px;
		// color: #34f8b1;
		color: #32a2e6;
		font-size: 13px;
		animation: right 2s infinite;
	}
	@keyframes right {
		50% {
			transform: translateX(12px);
		}
	}

	svg {
		width: 50px;
	}
	path {
		fill: #5903e2;
		// fill: #df1041;
		stroke: var(--main-bg-color);
	}

	&:hover,
	&:focus {
		path {
			// stroke: #34b1f8;
			stroke: #34f8b1;
		}
	}
}
@media (max-width: 600px) {
	.right-arrow {
		top: 80%;
	}
}
@media (min-width: 1200px) {
	.right-arrow {
		right: 10%;
	}
}
</style>
