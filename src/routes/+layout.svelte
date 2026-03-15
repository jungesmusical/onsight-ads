<script lang="ts">
	import '../app.pcss';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onDestroy, onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	const { children, data } = $props<{ children: Snippet; data: LayoutData }>();

	const kiosk: boolean = $derived(data.kiosk ?? false);
	const intervalMilliseconds: number = $derived((data.intervalSeconds ?? 10) * 1000);
	const configuredPlaylist: string[] = $derived(data.playlist ?? []);

	const routeAliases: Record<string, (musical: string) => string> = {
		cast: (musical) => `/${musical}/cast`,
		crew: (musical) => `/${musical}/crew`,
		disclaimer: (musical) => `/${musical}/disclaimer`,
		orchester: (musical) => `/${musical}/orchester`,
		orchestra: (musical) => `/${musical}/orchester`,
		gallery: (musical) => `/${musical}/gallery`,
		'external-ads': (musical) => `/${musical}/external-ads`
	};

	function normalizePathname(pathname: string): string {
		if (pathname.length > 1 && pathname.endsWith('/')) {
			return pathname.slice(0, -1);
		}

		return pathname;
	}

	function resolvePlaylistEntry(entry: string, musical: string | null): string | null {
		if (entry.startsWith('/')) {
			return normalizePathname(entry);
		}

		if (musical === null) {
			return null;
		}

		const aliasResolver = routeAliases[entry.toLowerCase()];

		if (aliasResolver) {
			return aliasResolver(musical);
		}

		return normalizePathname(`/${musical}/${entry}`);
	}

	function getMusicalSlug(pathname: string): string | null {
		const segments = pathname.split('/').filter(Boolean);
		if (segments.length === 0) {
			return null;
		}

		return segments[0] ?? null;
	}

	function buildKioskUrl(pathname: string): string {
		const url = new URL(page.url.href);
		url.pathname = pathname;
		return `${url.pathname}${url.search}${url.hash}`;
	}

	function getCurrentPlaylist(pathname: string): string[] {
		const musical = getMusicalSlug(pathname);

		if (configuredPlaylist.length > 0) {
			const resolved = configuredPlaylist
				.map((entry) => resolvePlaylistEntry(entry, musical))
				.filter((value): value is string => value !== null);

			if (resolved.length > 0) {
				return Array.from(new Set(resolved));
			}
		}

		if (musical !== null) {
			return [
				`/${musical}`,
				`/${musical}/cast`,
				`/${musical}/crew`,
				`/${musical}/orchester`,
				`/${musical}/gallery`,
				`/${musical}/external-ads`,
				`/${musical}/disclaimer`
			];
		}

		return [normalizePathname(pathname)];
	}

	let timer: ReturnType<typeof setInterval> | undefined;

	function stopTimer() {
		if (timer !== undefined) {
			clearInterval(timer);
			timer = undefined;
		}
	}

	function startTimer() {
		stopTimer();

		if (!kiosk) {
			return;
		}

		if (typeof document !== 'undefined' && document.hidden) {
			return;
		}

		timer = setInterval(async () => {
			const currentPath = normalizePathname(page.url.pathname);
			const playlist = getCurrentPlaylist(currentPath);

			if (playlist.length < 2) {
				return;
			}

			const index = playlist.indexOf(currentPath);
			const nextIndex = index === -1 ? 0 : (index + 1) % playlist.length;
			const nextPath = playlist[nextIndex];

			await goto(buildKioskUrl(nextPath), {
				replaceState: true,
				noScroll: true,
				keepFocus: true
			});
		}, intervalMilliseconds);
	}

	onMount(() => {
		startTimer();

		const onVisibilityChange = () => {
			if (document.hidden) {
				stopTimer();
				return;
			}

			startTimer();
		};

		document.addEventListener('visibilitychange', onVisibilityChange);

		return () => {
			document.removeEventListener('visibilitychange', onVisibilityChange);
			stopTimer();
		};
	});

	onDestroy(() => {
		stopTimer();
	});

	$effect(() => {
		startTimer();
	});
</script>

{@render children()}
