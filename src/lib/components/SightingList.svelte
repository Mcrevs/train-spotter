<script lang="ts">
	import type { SightingDoc } from "../pouchdb/types";
	import { db, onChange } from "$lib/pouchdb";

	let days: [string, SightingDoc[]][] = [];

	onChange(async () => {
		await db.createIndex({ index: { fields: ["time", "type"] } });

		const result = await db.find({
			selector: { type: "sighting", time: { $gte: null } },
			sort: [{ time: "desc" }],
		});

		days = Object.entries(
			Object.groupBy<number, SightingDoc>(result.docs, (i) => {
				const day = new Date(Number(i.time));
				day.setHours(0);
				day.setMinutes(0);
				day.setSeconds(0);
				day.setMilliseconds(0);
				return day.getTime();
			}),
		).map(([k, v]) => [
			new Date(Number(k)).toLocaleDateString("en-uk", {
				year: "numeric",
				month: "long",
				day: "numeric",
			}),
			v,
		]) as [string, SightingDoc[]][];
	});
</script>

<div class="list">
	{#each days as [day, sightings]}
		<div class="heading">{day}</div>
		{#each sightings as sighting}
			<a class="sighting" href="/sightings/{sighting._id}">
				<span>{sighting.identification}</span>
				<span class="location">{sighting.location}</span>
			</a>
		{/each}
	{/each}
</div>

<style lang="scss">
	.list {
		flex-direction: column;
		display: flex;
		width: 100%;

		.heading {
			grid-area: auto / 1 / auto / 3;
			background-color: var(--bg-4);
			border-radius: 5px;
			padding: 5px 5px;
		}

		.sighting {
			white-space: nowrap;
			padding: 2.5px 3px;
		}

		.location {
			text-align: right;
			float: right;
		}
	}
</style>
