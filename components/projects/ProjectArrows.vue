<template>
	<div class="arrows">
		<div class="left-arrow" @click="$emit('clickleft')">
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
					stroke-width="5"
				/>
			</svg>
		</div>
		<div class="right-arrow" @click="$emit('clickright')">
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
					stroke-width="5"
				/>
			</svg>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.arrows {
	.left-arrow,
	.right-arrow {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translate(-80px, -50%);
		z-index: 11;
		cursor: pointer;

		svg {
			width: 37px;
		}
		path {
			fill: #df1041;
			stroke: var(--main-bg-color);
			stroke-width: 4px;
		}

		&:hover {
			path {
				stroke: var(--select-color);
			}
		}
	}
	.right-arrow {
		left: auto;
		right: 0;
		transform: translate(80px, -50%);
	}
}
.left-arrow svg,
.right-arrow svg {
	opacity: 0;
}
.showArrows {
	.left-arrow svg {
		opacity: 1;
		animation: fadeInLeft;
		animation-duration: 1s;
	}
	.right-arrow svg {
		opacity: 1;
		animation: fadeInRight;
		animation-duration: 1s;
	}
}
.showLeftArrow svg {
	opacity: 1;
	animation: fadeInLeft;
	animation-duration: 1s;
}
.showRightArrow svg {
	opacity: 1;
	animation: fadeInRight;
	animation-duration: 1s;
}
@media (max-width: 930px) {
	.arrows {
		.right-arrow {
			transform: translate(50px, -50%);
		}
		.left-arrow {
			transform: translate(-50px, -50%);
		}
	}
}
@media (max-width: 800px) {
	.arrows {
		.right-arrow {
			transform: translate(-70px, 85%);
			bottom: 0;
			top: auto;
		}
		.left-arrow {
			transform: translate(70px, 85%);
			bottom: 0;
			top: auto;
		}
	}
}

@media (max-width: 440px) {
	.arrows {
		.right-arrow {
			transform: translate(-125px, 85%);
		}
		.left-arrow {
			transform: translate(125px, 85%);
		}
	}
}
</style>
