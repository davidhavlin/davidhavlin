<template>
	<div class="left-arrow">
		<svg
			width="70"
			height="94"
			viewBox="0 0 70 94"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M67.5 5V2.5H65H41H38.5V5V14.5H29H26.5V17V26.5H17H14.5V29V38.5H5H2.5V41V53V55.5H5H14.5V65V67.5H17H26.5V77V79.5H29H38.5V89V91.5H41H65H67.5V89V77V74.5H65H55.5V65V62.5H53H43.5V53V50.5H41H31.5V43.5H41H43.5V41V31.5H53H55.5V29V19.5H65H67.5V17V5Z"
				fill="white"
				stroke="black"
				stroke-width="3"
			/>
		</svg>
	</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.left-arrow {
	position: absolute;
	left: 6rem;
	z-index: 1;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;
	pointer-events: initial;

	svg {
		width: 50px;
	}
	path {
		fill: #df1041;
		stroke: var(--main-bg-color-darker);
	}

	&:hover,
	&:focus {
		path {
			stroke: #fff;
		}
	}
}
@media (max-width: 800px) {
	.left-arrow {
		left: 1rem;
	}
}
@media (max-width: 600px) {
	.left-arrow {
		top: 80%;
	}
}
</style>
