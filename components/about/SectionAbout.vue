<template>
	<div v-if="!transitioning" class="animate">
		<p>
			Vyučený grafik, ale vždy ma to viac ťahalo k programovaniu a že som
			sa v tom našiel. <br />
			Osoba s citom pre detail, fanúšik prírody, hier, seriálov,
			kinematografie a programovania!
		</p>
	</div>
</template>

<script>
export default {
	name: 'SectionAbout',
	props: {
		transitioning: { type: Boolean, default: false },
	},
}
</script>

<style lang="scss" scoped>
.animate {
	animation: skuska 500ms forwards;
	opacity: 0;
}
@keyframes skuska {
	to {
		opacity: 1;
	}
}
</style>
