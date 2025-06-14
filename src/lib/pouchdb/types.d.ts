/// <reference types="pouchdb-core" />

export type SightingDoc = PouchDB.Core.ExistingDocument<{
	identification: string;
	type: "sighting";
	time: number;
	location: {
		geolocation: GeolocationCoordinates | null;
		custom: string;
	};
}>;

export type SchemaDoc = PouchDB.Core.ExistingDocument<{
	type: "schema";
	icon: string;
	name: string;
	fields: string[];
}>;

export type AnyDoc = Omit<SightingDoc | SchemaDoc, "_rev">;
