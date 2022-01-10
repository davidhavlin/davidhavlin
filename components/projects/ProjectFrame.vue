<template>
	<div class="selected-frame"></div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.selected-frame {
	// width: 120px;
	width: 119px;
	height: 500px;
	position: absolute;
	top: 49.7%;
	left: 49.9%;
	transform: translate(-50%, -50%);
	outline: 6px solid var(--select-color);
}
.projectShowcase .selected-frame {
	width: 400px;
	outline: 8px solid #0b000f;
	left: 110px;
}

@media (max-width: 800px) {
	.selected-frame {
		height: 400px;
	}
	.projectShowcase .selected-frame {
		width: 300px;
		left: -40px;
	}
}
@media (max-width: 620px) {
	.projectShowcase .selected-frame {
		width: 400px;
		left: 50%;
		// top: 23.2%;
		top: 200px;
	}
}

@media (max-width: 440px) {
	.projectShowcase .selected-frame {
		width: 100vw;
	}
}

@media (max-height: 690px) {
	.projectShowcase .selected-frame {
		height: 400px;
	}
	.selected-frame {
		height: 300px;
	}
}
@media (max-height: 570px) {
	.projectShowcase .selected-frame {
		height: 300px;
		top: 29%;
	}
	.selected-frame {
		height: 150px;
	}
}
@media (min-width: 800px) and (max-height: 570px) {
	.projectShowcase .selected-frame {
		height: 300px;
		top: 49.7%;
	}
}
</style>
