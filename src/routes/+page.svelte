<script>
	const days = [
		{
			title: 'Day 1',
			sections: [
				{
					heading: 'Tbilisi → Telavi (via Gombori Pass, ~2 hrs)',
					stops: [
						{
							name: 'Ujarma Fortress',
							desc: '3rd-century royal citadel of King Vakhtang Gorgasali perched above the Iori River gorge. One of the most important fortresses guarding the pass from Kartli into Kakheti. Panoramic views, 10 GEL entry.',
							coords: '41.8114,45.1543',
							tags: ['fortress', 'viewpoint']
						},
						{
							name: 'Gombori Village (1,050m)',
							desc: 'Roadside farmers sell honey, walnuts, cheese, and fresh vegetables. WWII memorial nearby.',
							coords: '41.8594,45.2003',
							tags: ['village', 'food']
						},
						{
							name: 'New Shuamta',
							desc: 'Active 16th-century nunnery with frescoes, founded by the wife of King Lewan II.',
							coords: '41.9136,45.3910',
							tags: ['monastery']
						},
						{
							name: 'Old Shuamta',
							desc: 'Three churches dating from the 5th-7th centuries in a forested mountain setting at 1,015m. Rarely crowded and deeply atmospheric.',
							coords: '41.9109,45.4059',
							tags: ['monastery', 'ancient']
						},
						{
							name: 'Ikalto Monastery & Academy',
							desc: '6th-century monastery with ruins of a 12th-century academy where poet Shota Rustaveli studied. Ancient qvevri wine pots visible in the gardens.',
							coords: '41.9374,45.3811',
							tags: ['monastery', 'academy']
						},
						{
							name: 'Alaverdi Monastery',
							desc: "Georgia's second-tallest cathedral at over 55 meters, built in the 11th century. Monks produce wine on-site.",
							coords: '42.0325,45.3772',
							tags: ['monastery', 'wine']
						},
						{
							name: 'Batonistsikhe Fortress',
							desc: "King Erekle II's 18th-century palace with an excellent modern history museum.",
							coords: '41.9173,45.4760',
							tags: ['fortress', 'museum']
						},
						{
							name: 'Giant Plane Tree',
							desc: '900-year-old tree with a 12m trunk circumference, right next to the fortress.',
							coords: '41.9167,45.4782',
							tags: ['nature']
						}
					],
					urbex: [
						{
							name: 'Telavi Abandoned Church',
							coords: "41°55'08.0\"N 45°25'27.6\"E",
							decimal: '41.9189,45.4243'
						}
					]
				},
				{
					heading: 'Telavi → Sighnaghi (~1.5 hrs through vineyard villages)',
					stops: [
						{
							name: 'Tsinandali Estate',
							desc: '19th-century palace of poet Prince Chavchavadze with an 18-hectare European-designed garden and historic winery.',
							coords: '41.8969,45.5652',
							tags: ['palace', 'wine']
						},
						{
							name: 'Schuchmann Wine Chateau',
							desc: 'Modern winery in Kisiskhevi with tastings, restaurant, and even a wine spa.',
							coords: '41.9000,45.5413',
							tags: ['wine']
						},
						{
							name: 'Alazani Valley Viewpoint',
							desc: "Sweeping panorama just before entering Sighnaghi — don't skip this.",
							coords: '41.6279,45.9204',
							tags: ['viewpoint']
						},
						{
							name: 'Sighnaghi Viewpoint',
							desc: 'Best in-town viewpoint overlooking the valley and Caucasus mountains.',
							coords: '41.6207,45.9224',
							tags: ['viewpoint']
						},
						{
							name: 'Sighnaghi National Museum',
							desc: 'Home to ~40 works by Niko Pirosmani. Great terrace view. 20 GEL, closed Mondays.',
							coords: '41.6197,45.9229',
							tags: ['museum']
						},
						{
							name: 'Bodbe Monastery',
							desc: '9th-century monastery housing the grave of St. Nino, who converted Georgia to Christianity. Beautiful gardens and a holy spring.',
							coords: '41.6063,45.9339',
							tags: ['monastery']
						}
					],
					urbex: [
						{
							name: 'Sighnaghi City',
							coords: "41°37'04.1\"N 45°55'22.5\"E",
							decimal: '41.6178,45.9229'
						},
						{
							name: 'Eniseli Abandoned / Unconstructed Landmark',
							coords: "42°00'00.4\"N 45°39'21.8\"E",
							decimal: '42.0001,45.6561'
						},
						{
							name: 'Gurjaani High Building',
							coords: "41°44'36.7\"N 45°46'46.7\"E",
							decimal: '41.7435,45.7796'
						}
					]
				}
			]
		},
		{
			title: 'Day 2',
			sections: [
				{
					heading: 'Sighnaghi → Tbilisi',
					stops: [],
					urbex: [
						{
							name: 'Close to Vaziani',
							coords: "41°38'03.3\"N 45°03'13.4\"E",
							decimal: '41.6343,45.0537'
						},
						{
							name: 'Vaziani',
							coords: "41°42'19.1\"N 45°02'13.0\"E",
							decimal: '41.7053,45.0369'
						},
						{
							name: 'Georgia–Azerbaijan Border Destroyed Complex',
							coords: "41°27'57.6\"N 45°25'16.6\"E",
							decimal: '41.4660,45.4213'
						},
						{
							name: 'Udabno Village',
							coords: "41°30'10.8\"N 45°22'52.1\"E",
							decimal: '41.5030,45.3811'
						}
					]
				}
			]
		}
	];

	const tagColors = {
		fortress: { bg: '#fef3c7', text: '#92400e', icon: '🏰' },
		viewpoint: { bg: '#dbeafe', text: '#1e40af', icon: '👁' },
		monastery: { bg: '#ede9fe', text: '#5b21b6', icon: '⛪' },
		village: { bg: '#d1fae5', text: '#065f46', icon: '🏘' },
		food: { bg: '#fce7f3', text: '#9d174d', icon: '🍯' },
		wine: { bg: '#fde68a', text: '#78350f', icon: '🍷' },
		museum: { bg: '#e0e7ff', text: '#3730a3', icon: '🏛' },
		palace: { bg: '#fef9c3', text: '#854d0e', icon: '👑' },
		ancient: { bg: '#f3e8ff', text: '#6b21a8', icon: '🏚' },
		nature: { bg: '#dcfce7', text: '#166534', icon: '🌳' },
		academy: { bg: '#cffafe', text: '#155e75', icon: '📚' }
	};

	/**
	 * @param {string} coords
	 */
	function gmapsUrl(coords) {
		return `https://www.google.com/maps?q=${coords}`;
	}
</script>

<svelte:head>
	<title>Trip to Sakartvelo</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Serif+Display&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="page">
	<header>
		<div class="header-bg"></div>
		<div class="header-content">
			<span class="flag">🇬🇪</span>
			<h1>Trip to Sakartvelo</h1>
			<p class="subtitle">Tbilisi → Gombori Pass → Telavi → Sighnaghi → Tbilisi</p>
		</div>
	</header>

	<main>
		{#each days as day, dayIdx}
			<section class="day">
				<div class="day-badge">
					<span>{day.title}</span>
				</div>

				{#each day.sections as section, secIdx}
					<div class="route-section">
						<h2 class="route-heading">
							<span class="route-icon">🛣</span>
							{section.heading}
						</h2>

						{#if section.stops.length > 0}
							<div class="stops">
								{#each section.stops as stop, i}
									<div class="stop-card">
										<div class="stop-number">{i + 1}</div>
										<div class="stop-body">
											<div class="stop-header">
												<h3>{stop.name}</h3>
												<a
													href={gmapsUrl(stop.coords)}
													target="_blank"
													rel="noopener noreferrer"
													class="map-link"
													title="Open in Google Maps"
												>
													<svg
														width="16"
														height="16"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
													>
														<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
														<circle cx="12" cy="10" r="3" />
													</svg>
													Map
												</a>
											</div>
											<p>{stop.desc}</p>
											{#if stop.tags}
												<div class="tags">
													{#each stop.tags as tag}
														{@const color = tagColors[tag] || { bg: '#f3f4f6', text: '#374151', icon: '📍' }}
														<span
															class="tag"
															style="background:{color.bg};color:{color.text}"
														>
															{color.icon} {tag}
														</span>
													{/each}
												</div>
											{/if}
										</div>
									</div>
								{/each}
							</div>
						{/if}

						{#if section.urbex && section.urbex.length > 0}
							<div class="urbex-section">
								<h3 class="urbex-heading">
									<span class="urbex-icon">⚠️</span>
									Digger / Urbex Locations
								</h3>
								<div class="urbex-grid">
									{#each section.urbex as spot}
										<a
											href={gmapsUrl(spot.decimal)}
											target="_blank"
											rel="noopener noreferrer"
											class="urbex-card"
										>
											<div class="urbex-name">{spot.name}</div>
											<code class="urbex-coords">{spot.coords}</code>
										</a>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</section>
		{/each}
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
		background: #f8fafc;
		color: #1e293b;
		-webkit-font-smoothing: antialiased;
	}

	.page {
		min-height: 100vh;
	}

	/* Header */
	header {
		position: relative;
		overflow: hidden;
		padding: 3rem 1.5rem 2.5rem;
		text-align: center;
	}

	.header-bg {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%);
		z-index: 0;
	}

	.header-bg::after {
		content: '';
		position: absolute;
		inset: 0;
		background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
	}

	.header-content {
		position: relative;
		z-index: 1;
	}

	.flag {
		font-size: 3rem;
		display: block;
		margin-bottom: 0.5rem;
	}

	h1 {
		font-family: 'DM Serif Display', serif;
		font-size: 2.5rem;
		color: #fff;
		margin: 0 0 0.5rem;
		letter-spacing: -0.02em;
	}

	.subtitle {
		color: #c7d2fe;
		font-size: 0.95rem;
		margin: 0;
		font-weight: 500;
	}

	/* Main */
	main {
		max-width: 52rem;
		margin: 0 auto;
		padding: 2rem 1rem 4rem;
	}

	/* Day sections */
	.day {
		margin-bottom: 3rem;
	}

	.day-badge {
		display: flex;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.day-badge span {
		display: inline-block;
		background: linear-gradient(135deg, #4338ca, #6366f1);
		color: #fff;
		font-weight: 700;
		font-size: 0.85rem;
		padding: 0.4rem 1rem;
		border-radius: 9999px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.route-section {
		margin-bottom: 2.5rem;
	}

	.route-heading {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.15rem;
		font-weight: 600;
		margin: 0 0 1.25rem;
		color: #1e293b;
	}

	.route-icon {
		font-size: 1.2rem;
	}

	/* Stop cards */
	.stops {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.stop-card {
		display: flex;
		gap: 1rem;
		background: #fff;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		padding: 1rem 1.25rem;
		transition: box-shadow 0.2s, border-color 0.2s;
	}

	.stop-card:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
		border-color: #c7d2fe;
	}

	.stop-number {
		flex-shrink: 0;
		width: 2rem;
		height: 2rem;
		background: #eef2ff;
		color: #4338ca;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.85rem;
		margin-top: 0.15rem;
	}

	.stop-body {
		flex: 1;
		min-width: 0;
	}

	.stop-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		margin-bottom: 0.35rem;
	}

	.stop-body h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
		color: #0f172a;
	}

	.map-link {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.78rem;
		font-weight: 500;
		color: #4338ca;
		text-decoration: none;
		padding: 0.25rem 0.6rem;
		border-radius: 6px;
		background: #eef2ff;
		white-space: nowrap;
		transition: background 0.15s;
		flex-shrink: 0;
	}

	.map-link:hover {
		background: #ddd6fe;
	}

	.stop-body p {
		margin: 0 0 0.5rem;
		font-size: 0.88rem;
		line-height: 1.55;
		color: #475569;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.tag {
		font-size: 0.72rem;
		font-weight: 600;
		padding: 0.2rem 0.55rem;
		border-radius: 9999px;
		text-transform: capitalize;
	}

	/* Urbex section */
	.urbex-section {
		margin-top: 1.5rem;
		padding: 1.25rem;
		background: #18181b;
		border-radius: 12px;
		border: 1px solid #27272a;
	}

	.urbex-heading {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
		font-weight: 600;
		color: #fbbf24;
		margin: 0 0 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.urbex-icon {
		font-size: 1rem;
	}

	.urbex-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 0.5rem;
	}

	.urbex-card {
		display: block;
		background: #27272a;
		border: 1px solid #3f3f46;
		border-radius: 8px;
		padding: 0.75rem 1rem;
		text-decoration: none;
		transition: border-color 0.2s, background 0.2s;
	}

	.urbex-card:hover {
		border-color: #fbbf24;
		background: #2d2d30;
	}

	.urbex-name {
		font-size: 0.85rem;
		font-weight: 600;
		color: #f4f4f5;
		margin-bottom: 0.3rem;
	}

	.urbex-coords {
		font-size: 0.72rem;
		color: #a1a1aa;
		font-family: 'SF Mono', 'Fira Code', monospace;
	}

	/* Responsive */
	@media (max-width: 640px) {
		h1 {
			font-size: 1.8rem;
		}

		header {
			padding: 2rem 1rem 1.5rem;
		}

		.stop-card {
			padding: 0.85rem 1rem;
		}

		.urbex-grid {
			grid-template-columns: 1fr;
		}
	}
</style>