<script lang="ts">
	import type { SchemaDoc } from "$lib/pouchdb/types";
	import { db, onChange } from "$lib/pouchdb";
	import { icons } from "$lib/util";
	import Fa from "svelte-fa";

	let schema: SchemaDoc[] = [];

	onChange(async () => {
		await db.createIndex({ index: { fields: ["type"] } });
		const result = await db.find({ selector: { type: "schema" } });
		schema = result.docs as SchemaDoc[];
	});
</script>

<div class="flexcol">
	<h2>Schema</h2>
	<p class="secondary">Schemas define different types of sighting and their properties.</p>
	<hr />

	{#if schema.length > 0}
		{#each schema as item (item._id)}
			<a href={`/settings/schema/${item._id}`} class="entry">
				<Fa icon={icons[item.icon]} />
				<span>{item.name}</span>
			</a>
		{/each}
	{:else}
		<p class="center">No schemas found</p>
	{/if}
</div>
