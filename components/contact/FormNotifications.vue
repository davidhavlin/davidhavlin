<template>
	<div class="notification-container">
		<transition name="notify">
			<div v-if="success" class="success">
				Email úspešne odoslaný.
			</div>
		</transition>
		<transition name="notify">
			<div v-if="alert" class="alert">
				Prosím vyplňte polia.
			</div>
		</transition>
		<transition name="notify">
			<div v-if="error" class="error">
				Email sa nepodarilo odoslať (Nesprávny email).
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	props: {
		success: {
			type: Boolean,
			default: false,
		},
		alert: {
			type: Boolean,
			default: false,
		},
		error: {
			type: Boolean,
			default: false,
		},
	},
}
</script>

<style lang="scss" scoped>
.notification-container {
	position: absolute;
	width: 100%;
	height: 100vh;
	pointer-events: none;
	z-index: 100;
}
.success,
.alert,
.error {
	text-align: center;
	font-family: 'IBM Plex Mono', monospace;
	font-size: 0.8em;
	position: fixed;
	width: 12.625rem;
	color: #fff;
	background: #100317;
	bottom: 10%;
	left: calc(50% - 6.3125rem);
	padding: 0.7rem;
	box-shadow: #00ffac 0px 0.4em, #00ffac 0px -0.4em, #00ffac 0.4em 0px,
		#00ffac -0.4em 0px;
}
.alert {
	background: #100317;
	box-shadow: #fe006a 0px 0.4em, #fe006a 0px -0.4em, #fe006a 0.4em 0px,
		#fe006a -0.4em 0px;
}
.error {
	background: #100317;
	box-shadow: #fec300 0px 0.4em, #fec300 0px -0.4em, #fec300 0.4em 0px,
		#fec300 -0.4em 0px;
}
.notify-enter-active {
	animation: fadeInUp;
	animation-duration: 0.5s;
}
.notify-leave-to {
	animation: fadeOutDown;
	animation-duration: 0.5s;
}

@media (max-width: 800px) {
	.success,
	.alert,
	.error {
		bottom: 18%;
	}
}
</style>
