<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
</script>

<header class="bg-gradient-to-br from-indigo-950 via-indigo-800 to-indigo-600 py-12 px-6 text-center relative overflow-hidden w-full">
	<div class="relative z-10">
		<p class="text-5xl mb-4">🇬🇪</p>
		<h1 class="text-4xl font-bold text-white tracking-tight font-serif mb-3">
			Trip to Sakartvelo
		</h1>
		<p class="text-indigo-200 text-lg">
			Tbilisi &rarr; Gombori Pass &rarr; Telavi &rarr; Sighnaghi &rarr; Tbilisi
		</p>

		<nav class="mt-6 flex items-center justify-center gap-2">
			{#each locales as locale (locale)}
				<a
					href={localizeHref(page.url.pathname, { locale })}
					class="inline-block px-3 py-1 rounded-full text-xs font-medium transition-colors
						{locale === page.params?.locale
							? 'bg-white text-indigo-900'
							: 'bg-indigo-700/50 text-indigo-100 hover:bg-indigo-600/70'}"
				>
					{locale.toUpperCase()}
				</a>
			{/each}
		</nav>
	</div>
</header>
