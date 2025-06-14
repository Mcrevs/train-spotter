<script lang="ts">
	import { faTrain } from "@fortawesome/free-solid-svg-icons";
	import type { SightingDoc } from "$lib/pouchdb/types";
	import { spinner } from "../../Loading.svelte";
	import { db, onChange } from "$lib/pouchdb";
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import Fa from "svelte-fa";

	let sighting: SightingDoc | "not-found";

	onChange(async () => {
		await db.createIndex({ index: { fields: ["type", "_id"] } });

		const result = await db.find({
			selector: { type: "sighting", _id: page.params.id },
		});

		if (result.docs.length === 0) sighting = "not-found";
		else sighting = result.docs[0] as SightingDoc;
	});

	function save() {
		if (sighting !== "not-found") spinner(db.put(sighting));
	}

	async function remove() {
		if (sighting !== "not-found" && confirm("Are you sure you want to delete this sighting?")) {
			await spinner(db.remove(sighting));
			goto("/sightings");
		}
	}
</script>

{#if sighting === "not-found"}
	<h1>Not Found</h1>
	<p>The sighting you are looking for does not exist.</p>
{:else if sighting}
	<p class="secondary">{new Date(sighting.time).toLocaleString("en-uk")}</p>
	<h1><Fa icon={faTrain} /> - {sighting.identification}</h1>
	<div class="fields">
		<label>
			Identification:
			<input
				type="text"
				autocomplete="off"
				placeholder="Brighton"
				bind:value={sighting.identification}
			/>
		</label>
		<label>
			Location:
			<input
				type="text"
				autocomplete="off"
				placeholder="Brighton"
				bind:value={sighting.location.custom}
			/>
			{#if sighting.location.geolocation}
				<p class="secondary">
					{sighting.location.geolocation.latitude}° N {sighting.location.geolocation.longitude}° W
				</p>
			{/if}
		</label>
		<span style="margin-top: auto;">
			<button class="primary" on:click={save}>Save</button>
			<button class="secondary" on:click={remove}>Delete</button>
		</span>
	</div>

	<style lang="scss">
		.fields {
			flex-direction: column;
			margin-top: 15px;
			display: flex;
			gap: 10px;
		}
	</style>
{/if}
