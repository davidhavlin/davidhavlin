<template>
	<div
		id="showcase"
		class="project-page"
		:class="{ projectShowcase: showCase }"
	>
		<h1 v-if="!showCase" ref="pageTitle" class="project-page-title">
			My Projects ({{ index }}/{{ myProjects.length }})
		</h1>
		<div class="under-projects">
			<!-- ------------------- ARROWS A FRAME ---------- -->
			<ProjectArrows
				v-if="!showCase"
				:class="{ showArrows: animated }"
				@clickleft="prevProject"
				@clickright="nextProject"
			/>
			<ProjectFrame />
			<!-- **************************** -->
			<div class="projects">
				<div
					ref="container"
					class="project-boxes"
					@click="whichHalf"
					@transitionend="afterCarouselMove"
				>
					<ProjectBox
						v-for="project in myProjects"
						:id="'box-' + project.id"
						:key="project.id"
						:selected="selected"
						:showtime="showCase"
						:project="project"
						class="ProjectBox"
					/>
				</div>
			</div>
		</div>
		<!-- ------------- BUTTONY ------------- -->
		<ProjectButtons
			:class="{ showMeButton: animated }"
			:show-case="showCase"
			@clickshow="showProject"
			@clickclose="closeProject"
		/>
	</div>
</template>

<script>
import myProjects from '~/components/projects/Projects'

export default {
	data() {
		return {
			index: 1,
			realIndex: 1,
			counter: 2,
			active: false,
			size: 210,
			showCase: false,
			myProjects,
			initialX: null,
			initialY: null,
			animated: false,
			selected: null,
			hovered: null,
		}
	},
	computed: {
		container() {
			return document.querySelector('.project-boxes')
		},
		projects() {
			return Array.from(document.querySelectorAll('.ProjectBox'))
		},
		pageLoading() {
			return this.$store.state.pageLoading
		},
	},
	mounted() {
		if (!this.pageLoading) {
			this.mountProjects()
		}
	},
	watch: {
		'$route.query.project'(project) {
			if (!project) {
				this.closeProject()
				// return
			}
			// console.log({ project }) // TODO open projekt from query
		},
		pageLoading(loading) {
			if (loading) return
			this.mountProjects()
		},
	},
	destroyed() {
		window.removeEventListener('resize', this.resizeHandler)
	},

	methods: {
		mountProjects() {
			this.cloneElements()
			this.hideClones()
			this.onMountedStyles()
			this.selected = this.projects[this.counter + 1]

			this.handleHover()
			this.animationOnRender()
			this.handleSwipe()
			window.addEventListener('resize', this.resizeHandler)
			if (this.$route.query.project) {
				this.$router.push({ query: {} })
				// TODO nech otvara projekt z query
				this.setProjectFromQuery(this.$route.query.project)
			}
		},
		setProjectFromQuery(slug) {
			const slugIndex = myProjects.findIndex((p) => p.slug === slug)
			console.log({ slugIndex, slug })

			this.selectMidleBox(true)
			this.counter++
			this.containerTransform()
			this.realIndex = slugIndex
			this.index = slugIndex
			// this.realIndex === this.myProjects.length - 1
			// 	? (this.realIndex = 0)
			// 	: this.realIndex++
			// this.index === this.myProjects.length
			// 	? (this.index = 1)
			// 	: this.index++
			this.$nextTick(() => {
				this.showProject()
			})
			// setTimeout(() => {
			// }, 2000)
		},
		resizeHandler(e) {
			if (e.target.innerWidth < 931) {
				this.size = 180
				this.containerTransform()
			} else if (e.target.innerWidth > 931) {
				this.size = 210
				this.containerTransform()
			}
		},
		hideClones() {
			const elements = document.querySelectorAll('.clone')
			// po animacii vymazat classu s animaciou, bez tohto tam bol divny preblik
			// animacia je tam kvoli loadnuti klonov na zaciatku, bez toho tam bol vizualny glitch
			elements.forEach(
				(el) => {
					el.addEventListener('animationend', () => {
						el.classList.remove('clone')
					})
				},
				{ once: true }
			)
		},
		afterCarouselMove() {
			if (!event.target.classList.contains('project-boxes')) return
			this.carouselMagic()
		},
		// HOVER LISTENERS
		// kazdemu projektu dam event listener, aj kopiam
		handleHover() {
			this.projects.forEach((proj) => {
				proj.addEventListener('mouseenter', this.hoverInHandler)
				proj.addEventListener('mouseleave', this.removeHovered)
			})
		},
		// podla id dam classu originalu a jeho kopii, aby transitiony boli plynule pri preskakovani
		// z kopie na original, musim to riesit takto a nie cez css hover
		hoverInHandler(e) {
			if (this.showCase) return
			const projectID = e.target.id
			this.hovered = this.projects.filter(
				(project) => project.id === projectID
			)
			this.hovered.forEach((project) => project.classList.add('hovered'))
		},
		// odstranim hovered classu zo vsetkych projektov
		removeHovered() {
			if (this.showCase || !this.hovered) return
			this.hovered.forEach((proj) => proj.classList.remove('hovered'))
		},

		handleSwipe() {
			this.container.addEventListener(
				'touchstart',
				this.handleTouchStart,
				false
			)
			this.container.addEventListener(
				'touchmove',
				this.handleTouchMove,
				false
			)
		},
		handleTouchStart(e) {
			this.initialX = e.touches[0].clientX
			this.initialY = e.touches[0].clientY
		},
		handleTouchMove(e) {
			if (
				this.initialX === null ||
				this.initialY === null ||
				this.showCase
			)
				return
			const currentX = e.touches[0].clientX
			const currentY = e.touches[0].clientY
			let diffX = this.initialX - currentX
			let diffY = this.initialY - currentY
			if (Math.abs(diffX) + Math.abs(diffY) > 100) {
				if (Math.abs(diffX) > Math.abs(diffY)) {
					// horizontalne slidovanie.. right / left
					diffX > 0 ? this.nextProject() : this.prevProject()
				}
				diffX = null
				diffY = null
			}
		},

		whichHalf(e) {
			if (e.composedPath()[2] === this.selected.previousSibling) {
				this.prevProject()
			} else if (e.composedPath()[2] === this.selected.nextSibling) {
				this.nextProject()
			} else if (e.composedPath()[2] === this.selected && this.showCase) {
				this.closeProject()
			} else if (e.composedPath()[2] === this.selected) {
				this.showProject()
			}
		},

		showProject() {
			this.$router.push({
				query: { project: this.myProjects[this.realIndex].slug },
			})
			/* pokial nemaju classu selected tak dostanu classu ktora ich schova */
			this.projects.map((project) => {
				if (!project.classList.contains('selected'))
					project.classList.add('hideBox')
			})
			this.$store.commit('SET_SHOWCASE', true)
			// this.$store.commit('SET_SHOWCASE_BG')
			this.removeHovered()
			this.showCase = true
			this.animated = false
			this.selected.classList.add('show')
			// zafarbim page title podla vybraneho projektu, nech ladia farby
			// prettier-ignore
			// this.$refs.pageTitle.style.color = this.myProjects[this.realIndex].color.main
			const el = document.getElementById('showcase')
			el.style.background = `linear-gradient(0deg, #0e031b91 29%, ${
				this.myProjects[this.realIndex].color.main
			} 302%)`
		},
		closeProject() {
			this.$router.push({ query: {} })
			const el = document.getElementById('showcase')
			el.style.background = null

			this.$store.commit('SET_SHOWCASE', false)
			this.projects.forEach((proj) =>
				proj.classList.remove('hideBox', 'show')
			)
			this.showCase = false

			// this.$refs.pageTitle.style.color = '#38fdfe'
			// aby po kliknuti na closebtn sa z animovali rychlejsie, inak by to trvalo ako pri renderi
			this.projects.forEach(
				(proj) => (proj.style.animationDelay = '50ms')
			)
		},
		nextProject() {
			// nechcem aby sa dalo klikat na dalsi projekt kym je animacia active
			if (this.active) return
			this.active = true
			// pridava classu selected strednemu projektu
			this.selectMidleBox(true)
			this.counter++
			this.containerTransform()
			this.realIndex === this.myProjects.length - 1
				? (this.realIndex = 0)
				: this.realIndex++
			this.index === this.myProjects.length
				? (this.index = 1)
				: this.index++
			// const el = document.getElementById('showcase')
			// el.style.background = `linear-gradient(0deg, #0e031b91 29%, ${
			// 	this.myProjects[this.realIndex].color.main
			// } 302%)`
		},
		prevProject() {
			if (this.active) return
			this.active = true
			this.selectMidleBox(false)
			this.counter--
			this.containerTransform()

			// prettier-ignore
			this.realIndex === 0 ? (this.realIndex = this.myProjects.length - 1) : this.realIndex--
			// prettier-ignore
			this.index === 1 ? (this.index = this.myProjects.length) : this.index--
			// const el = document.getElementById('showcase')
			// el.style.background = `linear-gradient(0deg, #0e031b91 29%, ${
			// 	this.myProjects[this.realIndex].color.main
			// } 302%)`
		},

		containerTransform(transition = true) {
			transition
				? (this.container.style.transition = 'transform 0.2s ease')
				: (this.container.style.transition = 'none')

			this.container.style.transform = `translateX(${
				-this.size * this.counter
			}px)`
		},

		onMountedStyles() {
			// nastavim spravny transform a selected po nacitani stranky
			if (window.innerWidth < 931) {
				this.size = 180
				this.containerTransform()
			} else if (window.innerWidth > 931) {
				this.size = 210
				this.containerTransform()
			}
			this.projects[this.counter + 1].classList.add('selected')
		},
		// spusti sa len ked dojdem na klona ktory ma nas portnut na original, vypne transition aby nebol vidiet skok
		carouselMagic() {
			if (this.projects[this.counter].classList.contains('clone-prev')) {
				this.counter = this.projects.length - 4
				this.containerTransform(false)
				this.projects.map((proj) => proj.classList.remove('selected'))

				// oznaci original selected
				this.selected = this.projects[this.counter + 1]
				this.selected.classList.add('selected')
			}

			if (this.counter === this.projects.length - 3) {
				this.counter = 1
				this.containerTransform(false)

				this.projects.map((proj) => proj.classList.remove('selected'))
				this.selected = this.projects[this.counter + 1]
				this.selected.classList.add('selected')
			}
			this.active = false
		},

		cloneElements() {
			// klonujem projekty aby carousel fungoval donekonecna, ked bude viac projektov najde sa ine riesenie
			const firstchild = this.container.firstChild
			const lastchild = this.container.lastChild
			const clonedFirstBox = firstchild.cloneNode(true)
			const clonedFirstNextBox = firstchild.nextSibling.cloneNode(true)
			const clonedLastBox = lastchild.cloneNode(true)
			const clonedLastPrevBox = lastchild.previousSibling.cloneNode(true)
			clonedFirstBox.classList.add('clone')
			clonedFirstNextBox.classList.add('clone')
			clonedLastBox.classList.add('clone')
			clonedLastPrevBox.classList.add('clone', 'clone-prev')

			this.container.prepend(clonedLastBox)
			this.container.prepend(clonedLastPrevBox)
			this.container.appendChild(clonedFirstBox)
			this.container.appendChild(clonedFirstNextBox)
		},

		selectMidleBox(direction) {
			// prve odstranim vsetkym classu a potom pridam na zaklade smeru kam carousel ide
			this.projects.map((proj) => proj.classList.remove('selected'))
			if (direction) {
				this.selected = this.projects[this.counter + 2]
				this.selected.classList.add('selected')
			} else {
				this.selected = this.projects[this.counter]
				this.selected.classList.add('selected')
			}
		},
		animationOnRender() {
			const lastProject = this.projects.length - 1
			this.projects[lastProject].addEventListener('animationend', () => {
				this.animated = true
			})
		},
	},
	head() {
		return {
			title: 'David Havlin - Projects',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'Moja osobná portfólio web stránka, David Havlín',
				},
			],
		}
	},
}
</script>

<style lang="scss" scoped>
.project-page {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	background: var(--main-bg-color);
	overflow: hidden;
	z-index: 10;
	transition: background 300ms;
}

.project-page-title {
	font-family: 'Press Start 2P', cursive;
	font-weight: normal;
	font-size: 1.3em;
	color: var(--select-color);
	z-index: 10;
	// zabranuje aby text glitchoval kvoli hover animacii na inom elem.
	transform: translateZ(0);
}
.projects {
	position: relative;
	display: flex;
	height: 574px;
	width: 600px;
	overflow: hidden;
	transform: translateX(21px);
	align-items: center;
	padding-left: 0.5rem;

	.ProjectBox {
		position: relative;
		margin-right: 90px;
	}

	.clone {
		opacity: 0;
		animation: fadeInLater 0.3s forwards ease;
		animation-delay: 1600ms;
	}
	@keyframes fadeInLater {
		to {
			opacity: 1;
		}
	}

	#box-0,
	#box-1,
	#box-2 {
		opacity: 0;
		animation: boxIn 0.5s forwards ease;
		animation-delay: 1400ms;
	}
	#box-1 {
		animation-delay: 1200ms;
	}
	#box-2 {
		animation-delay: 1600ms;
	}

	@keyframes boxIn {
		from {
			transform: translateY(-600px);
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
}
.under-projects {
	position: relative;
	z-index: 1;
}

.project-boxes {
	display: flex;
}

/* ////////////////////////////// SHOW CASE SEKCIA //////////////////////////// */
.hideBox {
	display: none;
}

.projectShowcase {
	.projects {
		overflow: visible;
		width: auto;
		transform: translateX(-90px);
		justify-content: flex-start;
		padding-left: 0;

		.project-boxes {
			transform: translateX(0) !important;
		}
		.ProjectBox {
			margin-right: 0;
		}
	}
}

@media (max-width: 930px) {
	.projects {
		width: 539px;
		transform: translateX(21px);

		.ProjectBox {
			margin-right: 60px;
		}
	}
}
@media (max-width: 800px) {
	.projects {
		height: 480px;
	}
	.project-page-title {
		font-size: 1em;
	}
	.show-btn {
		margin-bottom: 6rem;
	}
}
@media (max-width: 620px) {
	.projectShowcase {
		justify-content: center;
		overflow: auto;
		padding: 0 0;

		.projects {
			height: auto;
			transform: translateX(0px);
		}

		.project-page-title {
			margin-bottom: 20px;
		}
	}
}

@media (max-width: 440px) {
	.projectShowcase {
		justify-content: flex-start;
	}
	.projects {
		.ProjectBox:not(.selected)::after {
			content: '';
			position: absolute;
			top: -6px;
			left: -10px;
			width: 150%;
			height: 117%;
			background: #140527e0;
			z-index: 10;
			pointer-events: none;
		}
		.ProjectBox.selected::after {
			content: '';
		}
	}
}
@media (min-width: 800px) and (max-height: 700px) {
	.projectShowcase {
		.projects {
			height: 450px;
		}
	}
}

@media (max-height: 690px) {
	.projects {
		height: 355px;
	}
}
@media (max-height: 570px) {
	.projects {
		height: 200px;
	}
}
</style>
