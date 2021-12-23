<template>
	<div class="project-showcase">
		<div class="project-info showcase-content">
			<h4 :style="{ color: project.color.titles }">info</h4>
			{{ project.desc }}
		</div>
		<div class="project-url showcase-content">
			<h4 :style="{ color: project.color.titles }">url</h4>
			<a
				:href="project.url"
				:style="{ color: '#fff', whiteSpace: 'nowrap' }"
				target="new_blank"
			>
				{{ shortUrl(project.url) }}
			</a>
		</div>
		<div class="project-stack showcase-content">
			<h4 :style="{ color: project.color.titles }">stack</h4>
			<div class="project-icons" style="display: flex;">
				<div
					v-for="(utility, index) in project.stack"
					:key="index"
					class="prj-icon"
				>
					<img :src="makeIcon(utility)" :alt="utility" />
					<span class="icon-tooltip">{{ utility }}</span>
				</div>
			</div>
		</div>
		<div class="project-gh showcase-content">
			<h4 :style="{ color: project.color.titles }">github</h4>
			<a
				:style="{ color: '#fff', display: 'flex' }"
				:href="project.github"
				target="new_blank"
				:class="{ 'github-private': !project.github }"
				@click="clickHref(project.github, $event)"
			>
				<img
					class="github-icon"
					:src="require('@/assets/images/software/github.png')"
					alt="github"
				/>
				{{ project.github ? 'Github page' : 'private' }}
			</a>
		</div>
		<div class="mobile-close" :style="{ borderColor: project.color.main }">
			close
		</div>
	</div>
</template>

<script>
export default {
	props: {
		project: {
			type: Object,
			default() {
				return {
					title: 'coming soon',
				}
			},
		},
	},
	computed: {
		linkColor() {
			return this.project.color.url
		},
	},
	methods: {
		clickHref(link, e) {
			if (!link) e.stopPropagation()
		},
		makeIcon(tech) {
			switch (tech) {
				case 'HTML':
					return require('@/assets/images/software/html5.png')

				case 'SCSS':
					return require('@/assets/images/software/css.png')

				case 'ES6':
					return require('@/assets/images/software/js.png')

				case 'TS':
					return require('@/assets/images/software/typescript.png')

				case 'Vue':
					return require('@/assets/images/software/vue.png')

				case 'Vuex':
					return require('@/assets/images/software/vuex.png')

				case 'Nuxt':
					return require('@/assets/images/software/nuxt.png')

				case 'Quasar':
					return require('@/assets/images/software/quasar.png')

				case 'React':
					return require('@/assets/images/software/react.png')

				case 'Node':
					return require('@/assets/images/software/node.png')

				case 'Express':
					return require('@/assets/images/software/express.png')

				case 'Postgres':
					return require('@/assets/images/software/postgres.png')

				case 'Prisma':
					return require('@/assets/images/software/prisma.png')
			}
		},
		shortUrl(url) {
			return url.slice(8, url.length - 1)
		},
	},
}
</script>

<style lang="scss" scoped>
.project-showcase {
	position: absolute;
	display: none;
	top: 50%;
	transform: translateY(-50%);
}
.show {
	transition: all 1s ease;

	.project-showcase {
		display: inline-block;

		.showcase-content {
			position: relative;
			background: #0b000f;
			padding: 1rem;
			margin-bottom: 1.6rem;
			width: fit-content;
			min-width: 150px;

			a:hover {
				text-decoration: underline;
			}
		}

		h4 {
			position: absolute;
			transform: translate(0px, -28px);
			// color: #0c94ff;
		}
		.project-info,
		.project-url,
		.project-stack,
		.project-gh {
			animation: slideIn 0.5s forwards ease;
			opacity: 0;
			max-width: 300px;
		}
		.project-info {
			margin-top: 3rem;
			color: #fff;
			animation-delay: 0.5s;
			min-width: 250px;
		}
		.project-url {
			color: #d3015e;
			animation-delay: 0.7s;
		}
		.project-stack {
			animation-delay: 0.9s;
		}
		.project-gh {
			animation-delay: 1.1s;

			.github-private {
				color: red;
				cursor: not-allowed;
				// pointer-events: none;
			}
		}

		@keyframes slideIn {
			from {
				transform: translateX(-100px);
				opacity: 0;
			}
			to {
				transform: translateX(0px);
				opacity: 1;
			}
		}

		.prj-icon {
			position: relative;
			display: inline-block;
			width: 20px;
			margin-right: 0.5rem;
			img {
				width: 100%;
			}
			.icon-tooltip {
				visibility: hidden;
				min-width: 50px;
				left: 50%;
				transform: translateX(-50%);
				background-color: #fff;
				color: #000;
				text-align: center;
				border-radius: 6px;
				padding: 0.1rem 0.4rem;
				position: absolute;
				bottom: 37px;
				z-index: 1;
				font-size: 0.9em;
			}
			.icon-tooltip::after {
				content: ' ';
				position: absolute;
				top: 99%;
				left: 50%;
				margin-left: -5px;
				border-width: 5px;
				border-style: solid;
				border-color: #fff transparent transparent transparent;
			}

			&:hover .icon-tooltip {
				visibility: visible;
			}
		}
		.prj-icon:last-child {
			margin-right: 0;
		}

		.github-icon {
			display: inline-block;
			width: 20px;
			margin-right: 0.5rem;
		}
	}
	.gradient {
		opacity: 0;
	}
}

@media (max-width: 800px) {
	.show .project-showcase {
		.project-info {
			margin-top: 0;
		}
		.project-gh {
			margin-bottom: 0;
		}
	}
}
@media (max-width: 620px) {
	.show .project-showcase {
		display: flex;
		flex-wrap: wrap;
		left: 0;
		top: 100%;
		transform: translateY(0);
		background: #0c0110;
		padding-top: 2rem;

		.showcase-content {
			margin-bottom: 1rem;
		}

		.project-info {
			margin-top: 0rem;
		}
	}
}

@media (min-width: 800px) and (max-height: 570px) {
	.show .project-showcase {
		.project-info {
			margin-top: 1.6rem;
		}
		.showcase-content {
			padding: 0.6rem;
			margin-bottom: 1.2rem;
			font-size: 0.9em;
		}
	}
}
.mobile-close {
	display: none;
	@media (max-width: 620px) {
		width: 100%;
		height: 50px;
		color: red;
		background: white;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: 'Press Start 2P', cursive;
		font-size: 0.7em;
		text-transform: uppercase;
		background: #0c0110;
		color: #ffffff;
		border: 2px solid #17032e;
		cursor: pointer;

		&:hover {
			border-color: #00f3ff !important;
		}
	}
}
</style>
