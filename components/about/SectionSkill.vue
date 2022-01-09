<template>
	<div>
		<div v-if="!transitioning" class="animate">
			<p>
				Zameriavam sa hlavne na
				<strong>frontend</strong> development: <br />
			</p>
			<ul>
				<li
					v-for="(item, i) in $options.FE_ITEMS"
					:key="item"
					class="highlight"
					:style="{
						animationDelay: `${(i + 2) * 4}00ms`,
					}"
				>
					{{ item }}
				</li>
			</ul>
			<p class="d-mt-md">
				Ale čoraz viac zabŕdam do
				<strong>backendu</strong>:<br />
			</p>

			<ul>
				<li
					v-for="(item, i) in $options.BE_ITEMS"
					:key="item"
					class="highlight"
					:style="{
						animationDelay: `${
							(i + $options.FE_ITEMS.length + 2) * 4
						}00ms`,
					}"
				>
					{{ item }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
const FRONTEND_ITEMS = [
	'HTML, CSS/Scss',
	'JavaScript(ES6), TypeScript',
	'Vue(Vue 3, Quasar, Nuxt.js, Vuex)',
	'React(Redux, React native)',
	'Git(GitHub, BitBucket)',
]
const BACKEND_ITEMS = [
	'Node.js(Express.js, Adonis.js)',
	'Postgresql, Prisma 2',
	'Docker',
]
export default {
	name: 'SectionSkill',
	props: {
		transitioning: { type: Boolean, default: false },
	},
	FE_ITEMS: FRONTEND_ITEMS,
	BE_ITEMS: BACKEND_ITEMS,
}
</script>

<style lang="scss" scoped>
ul {
	margin-top: 10px;
	color: #f7ab1e;
}
.highlight {
	color: #f7ab1e;
	text-shadow: none;
	animation: highlight 600ms forwards;
}

@keyframes highlight {
	50% {
		color: #ffe870;
		text-shadow: -1px 0px 7px #ffe252;
	}
}

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
