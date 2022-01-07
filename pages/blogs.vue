<template>
	<div class="page-blogs-container">
		<h1 class="page-title">Moje blogy</h1>
		<section class="blogs-wrapper">
			<div v-for="blog in blogs" :key="`blog-id-${blog.id}`" class="blog">
				<div>{{ blog.title }}</div>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	name: 'Blogs',
	computed: {
		blogs() {
			console.log(this.$store.state.blogs)
			return this.$store.state.blogs
		},
	},
	mounted() {
		this.fetchBlogs()
	},
	methods: {
		fetchBlogs() {
			this.$store.dispatch('fetchBlogs')
		},
	},
	head() {
		return {
			title: 'Blogs',
		}
	},
}
</script>

<style lang="scss" scoped>
.page-blogs-container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: #fff;
	background: var(--main-bg-color);
	overflow: hidden;
	// pointer-events: none;
}

.page-title {
	font-family: 'Press Start 2P', cursive;
	font-size: 26px;
}
</style>
