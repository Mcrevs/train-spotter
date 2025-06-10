/// <reference types="pouchdb-core" />

export type SightingDoc = PouchDB.Core.ExistingDocument<{
	identification: string;
	location: string;
	time: number;
	type: "sighting";
}>;

export type SchemaDoc = PouchDB.Core.ExistingDocument<{
	type: "schema";
	icon: string;
	name: string;
	fields: string[];
}>;

export type AnyDoc = Omit<SightingDoc | SchemaDoc, "_rev">;
