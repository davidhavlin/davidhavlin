<template>
	<div
		class="page-blogs-container"
		:class="{ 'container-empty': blogs.length === 0 }"
	>
		<section class="title-wrapper">
			<div class="row items-center">
				<h1 class="page-title">Moje články</h1>
				<div
					v-click-outside="onClickSomewhere"
					class="title-info c-select fz-20 d-ml-md pointer"
					@click="onClickInfo"
				>
					<i class="fas fa-info-circle"></i>
					<div
						v-show="showTooltip"
						ref="tooltip"
						:class="tooltipClass"
						class="tooltip"
					>
						{{ $options.herokuInfo }}
					</div>
				</div>
			</div>
			<section v-if="blogs.length === 0 && !fetchLoading" class="message">
				<div
					ref="no-blogs"
					:style="{ color: messageColor }"
					class="blog-no-blogs"
				>
					<!-- Zatiaľ žiadne články... -->
				</div>
			</section>
			<section
				class="loading-container"
				:class="{ 'hide-loading': !fetchLoading }"
			>
				<div class="loading-blogs row">
					Loading
					<div ref="dots" class="dots"></div>
				</div>
			</section>
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

		<div v-if="blogs.length > 2" class="fade-wrapper"></div>
		<div class="stars-wrapper">
			<Stars class="stars" />
			<Stars class="stars3" />
		</div>
	</div>
</template>

<script>
const SHOWMECODE_URL = 'https://app-showmecode.herokuapp.com'
export default {
	name: 'Blogs',
	herokuInfo:
		'Keďže server hostím na heroku free plane tak prvý request môže trvať dlhšie (poprípade je server offline keď využil všetky voľné hodiny), zatiaľ dočasné riešenie :)',
	data() {
		return {
			index: 0,
			alreadyFetched: false,
			messageColor: '',
			showTooltip: false,
			dotsTimeout: null,
			tooltipClass: '',
		}
	},
	computed: {
		blogs() {
			return this.$store.state.blogs || []
		},
		pageLoading() {
			return this.$store.state.pageLoading
		},
		fetchLoading() {
			return this.$store.state.fetchLoading
		},
	},
	watch: {
		async pageLoading(loading) {
			if (loading || this.blogs.length > 0 || this.alreadyFetched) return
			await this.fetchBlogs()
		},
	},
	async mounted() {
		if (this.pageLoading || this.blogs.length > 0 || this.alreadyFetched)
			return
		await this.fetchBlogs()
	},
	destroyed() {
		this.alreadyFetched = false
	},
	methods: {
		onClickSomewhere() {
			this.showTooltip = false
		},
		onClickInfo(e) {
			const { top, left } = e.target.getBoundingClientRect()
			const minSize = 200
			const right = window.innerWidth - left
			console.log({ top, left, right })
			if (top < minSize && right < minSize) {
				this.tooltipClass = 'tooltip-down tooltip-left'
			} else if (top < minSize) {
				// move down
				this.tooltipClass = 'tooltip-down'
			} else if (right < minSize) {
				// move left
				this.tooltipClass = 'tooltip-left'
			}
			this.showTooltip = !this.showTooltip
		},
		threeDots() {
			const dotsArray = '...'.split('')
			dotsArray.forEach((dot, index) => {
				setTimeout(() => {
					if (!this.$refs.dots) return
					this.$refs.dots.innerHTML += dot
					if (index >= dotsArray.length - 1) {
						this.dotsTimeout = setTimeout(() => {
							this.$refs.dots.innerHTML = ''
							this.threeDots()
						}, 700)
					}
				}, 700 * (index + 1))
			})
		},
		async fetchBlogs() {
			this.threeDots()
			this.alreadyFetched = true

			const { error, data } = await this.$store.dispatch('fetchBlogs')

			if (error) {
				this.messageColor = '#ff00a3'
				let msg = error.message
				if (msg === 'Network Error') {
					msg += ',\r\n ShowMeCode.sk is offline \r\n try again later'
				}
				this.writingEffect(msg, this.$refs['no-blogs'])
				return
			}
			if (data && data.length === 0) {
				this.messageColor = '#ffb600'
				this.writingEffect(
					'Zatiaľ žiadne články...',
					this.$refs['no-blogs']
				)
			}
		},
		formatDate(dateString) {
			const options = {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				minimumFractionDigits: 2,
			}
			return new Date(dateString).toLocaleString('ru-RU', options)
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
	font-size: 23px;
}
section.title-wrapper {
	margin-top: 6%;
	position: relative;

	.message,
	.loading-container {
		position: absolute;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.title-info {
		position: relative;
	}
	.tooltip {
		$borderColor: #38fdfe;
		position: absolute;
		// width: 300px;
		// height: 300px;
		min-width: 180px;
		padding: 15px;
		border-radius: 4px;
		top: 0;
		left: 50%;
		background: #0d011c;
		transform: translate(-50%, calc(-100% - 10px));
		z-index: 10000000000;
		font-size: 13px;
		color: #fff;
		border: 1px solid $borderColor;
		user-select: none;

		&:before {
			content: '';
			position: absolute;
			bottom: 0;
			left: 50%;
			border-top: 8px solid $borderColor;
			border-bottom: 8px solid transparent;
			border-left: 8px solid transparent;
			border-right: 8px solid transparent;
			transform: translate(-50%, calc(100% + 1px));
		}

		&.tooltip-down {
			top: unset;
			transform: translate(-50%, calc(0% + 10px));

			&::before {
				bottom: unset;
				top: 0;
				border-top: 8px solid transparent;
				border-bottom: 8px solid $borderColor;
				transform: translate(-50%, -100%);
			}
		}
		&.tooltip-left {
			transform: translate(-100%, calc(-100% - 10px));

			&::before {
				bottom: 0;
				right: 0;
				border-top: 8px solid transparent;
				border-bottom: 8px solid transparent;
				border-left: 8px solid transparent;
				border-right: 8px solid $borderColor;
				transform: translate(1px, 50%);
			}
		}

		&.tooltip-down.tooltip-left {
			top: unset;
			bottom: 0;
			transform: translate(-100%, calc(100% + 10px));

			&::before {
				bottom: unset;
				left: unset;
				border-top: 8px solid transparent;
				border-bottom: 8px solid transparent;
				border-left: 8px solid transparent;
				border-right: 8px solid $borderColor;
				transform: translate(1px, -9px);
			}
		}
	}
}
section.blogs-wrapper {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 25px;
	margin-top: 30px;
	position: relative;
	z-index: 10;
}
.hide-loading {
	visibility: hidden;
	pointer-events: none;
}
.loading-blogs {
	position: relative;
	margin-top: 25px;
	font-family: 'Press Start 2P', cursive;
	color: #3afcfe;
	animation: pulse 1s infinite;
	filter: drop-shadow(0px 1px 16px #3afcfe);

	.dots {
		right: 0;
		transform: translateX(100%);
		position: absolute;
	}
}

@keyframes pulse {
	50% {
		text-shadow: 1px 0px 14px #099295;
	}
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
	box-shadow: $borderColor 0px 4px, $borderColor 0px -4px,
		$borderColor 4px 0px, $borderColor -4px 0px;
	font-family: monospace;
	cursor: pointer;

	&:hover {
		box-shadow: $hoverColor 0px 4px, $hoverColor 0px -4px,
			$hoverColor 4px 0px, $hoverColor -4px 0px;

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
		color: #bc8aff;
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
		color: #7545b5;
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
		color: #b278ff;
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
		margin-top: 25px;
		font-family: 'Press Start 2P';
		font-size: 12px;
		letter-spacing: -0.7px;
		height: 12px;
		text-align: center;
		line-height: 19px;
		white-space: pre;
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
	pointer-events: none;
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
		transform: scale(2.2);
	}
}
</style>
