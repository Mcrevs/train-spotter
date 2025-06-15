<script lang="ts">
	import "greset";
	import "$lib/global.scss";
	import "$lib/theme";

	import { pwaInfo } from "virtual:pwa-info";
	import type { PageData } from "./$types";
	import { fly } from "svelte/transition";
	import Loading from "./Loading.svelte";
	import Backbar from "./Backbar.svelte";
	import Navbar from "./Navbar.svelte";

	export let data: PageData;
</script>

<Loading />

{#if data.path.length > 1}
	<Backbar />
{/if}

<div style="overflow-x: hidden">
	{#key data.path}
		<main in:fly={{ x: -200, duration: 200, delay: 200 }} out:fly={{ x: 200, duration: 200 }}>
			<slot />
		</main>
	{/key}
</div>

<Navbar />

<!-- PWA Metadata -->
<svelte:head>
	{@html pwaInfo ? pwaInfo.webManifest.linkTag : ""}
	<meta name="apple-mobile-web-app-title" content="Spotter" />
</svelte:head>

{#await import("./ServiceWorker.svelte") then { default: ServiceWorker }}
	<ServiceWorker />
{/await}
