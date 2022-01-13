<template>
	<div
		class="page-blogs-container"
		:class="{ 'container-empty': blogs.length === 0 }"
	>
		<section class="title-wrapper">
			<h1 class="page-title">Moje blogy</h1>
		</section>
		<section
			v-if="blogs.length > 0"
			class="blogs-wrapper"
			:class="{
				'blogs-not-enough': blogs.length <= 2,
			}"
		>
			<div
				v-for="blog in blogs"
				:key="`blog-id-${blog.id}`"
				class="blog-wrapper"
			>
				<div class="blog" @click="goToBlog(blog.id)">
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
		<section v-else>
			<div ref="no-blogs" class="blog-no-blogs">
				<!-- Zatiaľ žiadne články... -->
			</div>
		</section>
		<div v-if="blogs.length > 2" class="fade-wrapper"></div>
		<div class="stars-wrapper">
			<Stars class="stars" />
			<Stars class="stars2" />
			<Stars class="stars3" />
		</div>
	</div>
</template>

<script>
const SHOWMECODE_URL = 'https://app-showmecode.herokuapp.com'
export default {
	name: 'Blogs',
	data() {
		return {
			showBlogs: false,
			index: 0,
		}
	},
	computed: {
		blogs() {
			return this.$store.state.blogs || []
		},
	},
	mounted() {
		this.fetchBlogs()
		setTimeout(() => {
			this.showBlogs = true
			this.writingEffect(
				'Zatiaľ žiadne články...',
				this.$refs['no-blogs']
			)
		}, 1000)
	},
	methods: {
		fetchBlogs() {
			this.$store.dispatch('fetchBlogs')
		},
		formatDate(dateString) {
			const options = {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
			}
			const newDate = new Date(dateString).toLocaleDateString(
				undefined,
				options
			)
			return newDate.replaceAll('/', '.')
		},
		randomNumber(max = 90, min = -90) {
			return Math.floor(Math.random() * (max - min) + min)
		},
		goToBlog(id) {
			window.open(`${SHOWMECODE_URL}/post/${id}`, '_blank').focus()
		},
		writingEffect(typedString, element) {
			if (!element) return
			if (this.index > typedString.length) {
				this.index = 0
				return
			}
			this.letter = typedString.slice(0, this.index++)
			element.textContent = this.letter

			setTimeout(() => {
				this.writingEffect(typedString, element)
			}, 100)
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
}
::-webkit-scrollbar-track {
	background: #110420;
}

::-webkit-scrollbar-thumb:hover {
	background: #ff007c;
}

.page-blogs-container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: #fff;
	background: var(--main-bg-color);
	overflow-y: auto;
	padding-left: 90px;
	padding-bottom: 100px;
}

.container-empty {
	justify-content: center;
	section.title-wrapper {
		margin-top: 0 !important;
	}
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
}

.fade-wrapper {
	position: relative;
	max-width: 658px;
	width: 100%;
	height: 0px;
	pointer-events: none;

	@media (min-width: 800px) {
		display: none;
	}
	@media (max-width: 650px) {
		// max-width: 333px;
	}

	&::after {
		content: '';
		position: absolute;
		width: 100%;
		background: linear-gradient(
			0deg,
			rgba(55, 19, 100, 1) 0%,
			rgba(26, 32, 36, 0) 50%
		);
		height: 200px;
		bottom: -20px;
		z-index: 20;
	}
}

.blog-wrapper {
	position: relative;
	max-width: 300px;
	width: 100%;
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
	background: #1e073a;
	// border: 2px solid $borderColor;
	// box-shadow: 0 4px 0 1px $borderColor, 0 1px 0 1px $borderColor;
	box-shadow: $borderColor 0px 5px, $borderColor 0px -5px,
		$borderColor 5px 0px, $borderColor -5px 0px;
	font-family: monospace;
	cursor: pointer;

	&:hover {
		// border-color: $hoverColor;
		// box-shadow: 0 4px 0 1px $hoverColor, 0 1px 0 1px $hoverColor;
		box-shadow: $hoverColor 0px 5px, $hoverColor 0px -5px,
			$hoverColor 5px 0px, $hoverColor -5px 0px;

		.blog-created {
			color: $hoverColor;
		}
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
		font-weight: 600;
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

	&-no-blogs {
		color: var(--select-color);
		margin-top: 30px;
		font-family: monospace;
		height: 18px;
	}
}

.something {
	transform: scale(0.01);
	transition: all 700ms cubic-bezier(0.785, 0.135, 0.15, 0.86);
	left: 40% !important;
	top: 30% !important;
}
.reveal {
	transform: scale(1);
	left: 0 !important;
	top: 0 !important;
}

@media (max-width: 800px) {
	.page-blogs-container {
		padding-left: 0;
	}
	section.title-wrapper {
		margin-top: 80px;
	}
	section.blogs-wrapper:not(.blogs-not-enough) {
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
		justify-items: center;
		width: 100%;
	}
}

.stars-wrapper {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	overflow: hidden;
}

.stars,
.stars2,
.stars3 {
	transition: all 10s;
	transform: scale(0.8);
	animation: traveling 20s linear infinite;
	opacity: 0;
}
.stars2 {
	animation-delay: 5s;
}

.stars3 {
	animation-delay: 8s;
}

@keyframes traveling {
	10% {
		opacity: 1;
	}
	90% {
		opacity: 1;
	}
	100% {
		opacity: 0;
		transform: scale(2.7);
	}
}
</style>
