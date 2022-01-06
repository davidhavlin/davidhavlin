// prettier-ignore
const myProjects = [
	{
		title: 'David Havlín Website',
		url: 'https://davidhavlin.com/',
		desc:
			'Moja osobná portfolio stránka ktorú som sa pokúsil spraviť trošku netradične.',
		logo: require('@/assets/images/projects/dh-logo.png'),
		github: 'https://github.com/davidhavlin/dhavlin.github.io',
		color: {
			main: '#3f0c8d',
			second: '#e9093e',
			title: '#00f3ff',
			titles: '#0089ff',
			url: '#81ffff',
		},
		stack: ['HTML', 'SCSS', 'ES6', 'Vue', 'Nuxt'],
		bg: require('@/assets/images/projects/dh-bg.webp'),
		images: [
			require('@/assets/images/projects/dh01.webp'),
			require('@/assets/images/projects/dh02.webp'),
			require('@/assets/images/projects/dh-mob.webp'),
		],
		id: 0,
	},
	{
		title: 'SHOW ME CODE',
		url: 'https://app-showmecode.herokuapp.com/',
		desc:
			'Moja plne funkčná prvá full-stack stránka o zdielaní blogov a obrázkov. S registráciou, komentovaním, lajkovaním a veľa ďalšieho. V hlavnej úlohe Typescript, Node, Express.',
		logo: require('@/assets/images/projects/a.png'),
		// github: 'https://github.com/davidhavlin/dhavlin.github.io',
		color: {
			main: '#3f0c8d',
			second: '#e9093e',
			title: '#00f3ff',
			titles: '#0089ff',
			url: '#81ffff',
		},
		stack: [
			'HTML',
			'SCSS',
			'TS',
			'Vue',
      'Vuex',
			'Quasar',
			'Node',
			'Express',
			'Postgres',
		],
		bg: require('@/assets/images/projects/smc-bg.png'),
		images: [
			require('@/assets/images/projects/smc-01.png'),
			require('@/assets/images/projects/smc-02.png'),
			require('@/assets/images/projects/smc-03.png'),
		],
		id: 1,
	},
	{
		title: 'NETFLIX clone',
		url: 'https://netfliks-clone.netlify.app/',
		desc:
			'Taka výzva prerobiť Netflix stránku a vyskúšať si iný framework, práca s API filmovou databázou.',
		logo: require('@/assets/images/projects/nf-logo.png'),
		github: 'https://github.com/davidhavlin/netflix-clone',
		color: {
			main: '#f00a40',
			second: '#e9093e',
			title: '#fff',
			titles: '#fff',
			url: '#ff0841',
		},
		stack: ['HTML', 'SCSS', 'ES6', 'React'],
		bg: require('@/assets/images/projects/nf01.webp'),
		images: [
			require('@/assets/images/projects/nf03.webp'),
			require('@/assets/images/projects/nf02.webp'),
			require('@/assets/images/projects/nf-mob.webp'),
		],
		id: 2,
	},
	{
		title: 'VR Video Saratov',
		url: 'https://videosaratov.netlify.app/',
		desc: 'Prerobená moja vôbec prvá web stránka pre virtuálnu realitu.',
		logo: require('@/assets/images/projects/vr-logo.png'),
		github: 'https://github.com/davidhavlin/videosaratov',
		color: {
			main: '#4a12be',
			second: '#e9093e',
			title: '#00f3ff',
			titles: '#0089ff',
			url: '#03e8fc',
		},
		stack: ['HTML', 'SCSS', 'ES6', 'Vue'],
		bg: require('@/assets/images/projects/vr-bg.webp'),
		images: [
			require('@/assets/images/projects/vr03.webp'),
			require('@/assets/images/projects/vr02.webp'),
			require('@/assets/images/projects/vr-mob.webp'),
		],
		id: 3,
	},
]

export default myProjects
