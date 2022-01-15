<template>
	<div class="contact-container">
		<div class="contact">
			<FormNotifications
				:success="success"
				:alert="alert"
				:error="error"
			/>
			<div class="left-section">
				<ContactForm
					class="contact-form"
					@alertLis="alertHandler"
					@successLis="successHandler"
					@errorLis="errorHandler"
				/>
			</div>
			<div class="right-section" :class="{ animate: rightSection }">
				<div ref="parent" class="hover-image"></div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
export default {
	data() {
		return {
			success: false,
			alert: false,
			error: false,
			rightSection: false,
		}
	},
	computed: {
		pageLoading() {
			this.$store.state.pageLoading
		},
	},
	watch: {
		pageLoading(loading) {
			if (loading) return
			this.effectHover()
			this.rightSection = true
		},
	},
	methods: {
		alertHandler(value) {
			this.alert = value
		},
		successHandler(value) {
			this.success = value
		},
		errorHandler(value) {
			this.error = value
		},
		effectHover() {
			const effect = new hoverEffect({
				parent: this.$refs.parent,
				intensity: 0.3,
				image1: require('@/assets/images/space.webp'),
				image2: require('@/assets/images/spacered.webp'),
				displacementImage: require('@/assets/images/dist2.jpg'),
				imagesRatio: 640 / 360,
			})
		},
	},
	mounted() {
		if (this.pageLoading) return
		this.effectHover()
		this.rightSection = true
	},
	head() {
		return {
			title: 'David Havlin - Contact me',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content:
						'Moja osobna portfolio web stranka, David Havlín | Email me at davidhavlin@gmail.com',
				},
			],
		}
	},
}
</script>

<style lang="scss" scoped>
.contact-container {
	background: var(--main-bg-color);
}
.contact {
	width: 100%;
	height: 100vh;
	display: flex;
	position: relative;
	overflow: hidden;
}

.left-section {
	width: 50%;
	height: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.right-section {
	user-select: none;
	opacity: 0;
	width: 50%;
	height: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	transition: opacity 5s ease;
}

.hover-image {
	width: 100%;
	height: 100%;
}

.animate {
	opacity: 1;
}

@media (max-width: 460px), (max-height: 460px) {
	.contact {
		flex-direction: column;
		height: auto;
	}

	.left-section {
		width: 100%;
		height: auto;
		justify-content: center;
		align-items: flex-start;
		padding: 6rem 1.5rem 7rem 1.5rem;
	}
	.right-section {
		width: 100%;
		overflow: hidden;
		height: 100vh;
	}
}
@media (max-width: 400px) {
	.left-section {
		padding: 6rem 1rem 7rem 1rem;
	}
}
</style>
