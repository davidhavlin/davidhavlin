<template>
	<div class="page-blogs-container">
		<section class="title-wrapper">
			<h1 class="page-title">Moje blogy</h1>
		</section>
		<section class="blogs-wrapper">
			<div class="skuska"></div>
			<div
				v-for="blog in blogs"
				:key="`blog-id-${blog.id}`"
				class="blog-wrapper"
			>
				<div class="blog">
					<header>
						<div class="blog-created">
							{{ formatDate(blog.createdAt) }}
						</div>
						<div class="blog-tech" :style="{ color: blog.color }">
							{{ blog.technology }}
						</div>
					</header>
					<div class="blog-title">{{ blog.title }}</div>
					<div class="blog-desc">{{ blog.description }}</div>
					<div class="blog-tags">
						<div
							v-for="tag in blog.tags"
							:key="`blog-tag-${tag}`"
							class="blog-tags--item"
							:style="{ backgroundColor: blog.color }"
						>
							{{ tag }}
						</div>
					</div>
					<footer>
						<div class="left-footer">
							<div class="blog-likes">
								<i class="fas fa-heart"></i>
								{{ blog._count.likes }}
							</div>
							<div class="blog-comments">
								<i class="fas fa-comment-alt"></i>
								{{ blog._count.comments }}
							</div>
							<div class="blog-mins">
								{{ blog.readTime }} min. čítanie
							</div>
						</div>
						<div class="blog-views">
							<i class="far fa-eye"></i>
							{{ blog.views }}
						</div>
					</footer>
				</div>
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
		formatDate(dateString) {
			const options = { year: 'numeric', month: 'long', day: 'numeric' }
			return new Date(dateString).toLocaleDateString(undefined, options)
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
::-webkit-scrollbar {
	-webkit-appearance: none;
	width: 7px;
}

::-webkit-scrollbar-thumb {
	border-radius: 0px;
	background-color: #371364;
	// -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
}
/* Track */
::-webkit-scrollbar-track {
	background: #110420;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #ff007c;
}

.page-blogs-container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	color: #fff;
	background: var(--main-bg-color);
	overflow-y: auto;
	padding-left: 90px;
	padding-bottom: 100px;
	// pointer-events: none;
}

.page-title {
	font-family: 'Press Start 2P', cursive;
	font-size: 26px;
}
section.title-wrapper {
	margin-top: 6%;
}
section.blogs-wrapper {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 25px;
	margin-top: 30px;
	position: relative;
	z-index: 10;

	// &::after {
	// 	content: '';
	// 	position: absolute;
	// 	width: 100%;
	// 	height: 100%;
	// 	background: linear-gradient(
	// 		0deg,
	// 		rgba(26, 32, 36, 1) 0%,
	// 		rgba(26, 32, 36, 0) 50%
	// 	);
	// }
}

.skuska {
	position: absolute;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		0deg,
		rgba(26, 32, 36, 1) 0%,
		rgba(26, 32, 36, 0) 50%
	);
}

.blog-wrapper {
	width: 300px;
}
.blog {
	$borderColor: #371364;
	$hoverColor: #ff007c;
	position: relative;
	display: flex;
	flex-direction: column;
	min-height: 150px;
	padding: 15px;
	width: 100%;
	margin-top: 24px;
	background: #110420;
	border: 2px solid $borderColor;
	box-shadow: 0 4px 0 1px $borderColor, 0 1px 0 1px $borderColor;
	cursor: pointer;

	&:hover {
		border-color: $hoverColor;
		box-shadow: 0 4px 0 1px $hoverColor, 0 1px 0 1px $hoverColor;
	}

	header {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		transform: translateY(calc(-100% - 4px));
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
	}

	footer {
		display: flex;
		justify-content: space-between;
		margin-top: auto;
		color: #5f3397;
		font-size: 12px;

		.left-footer {
			display: flex;
		}
	}

	&-tech {
		font-size: 19px;
		// font-weight: 700;
		font-family: 'Press Start 2P';
	}

	&-created {
		color: #371364;
		font-size: 12px;
	}

	&-title {
		font-size: 25px;
		color: #fff;
		word-break: break-word;
	}

	&-desc {
		font-size: 14px;
		color: #7545b5;
		margin-top: 3px;
	}

	&-comments {
		margin-left: 8px;
	}

	&-mins {
		margin-left: 15px;
	}

	&-tags {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 8px 0;

		&--item {
			color: #121618;
			font-size: 10px;
			font-weight: 700;
			line-height: 0.5;
			margin: 2px;
			padding: 5px 0.4em;
		}
	}
}

@media (max-width: 800px) {
	.page-blogs-container {
		padding-left: 0;
	}
	section.title-wrapper {
		margin-top: 80px;
	}
	section.blogs-wrapper {
		margin-bottom: -21px;
		border-bottom: 2px solid #9a49ff;
		overflow-y: scroll;
		padding: 0 13px;
		padding-bottom: 60px;
	}
}
@media (max-width: 650px) {
	section.blogs-wrapper {
		grid-template-columns: 1fr;
	}
}
</style>
