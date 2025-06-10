/// <reference types="pouchdb-core" />

export type SightingDoc = PouchDB.Core.ExistingDocument<{
	identification: string;
	location: string;
	time: number;
}>;

export type SchemaDoc = PouchDB.Core.ExistingDocument<{
	icon: string;
	name: string;
	fields: string[];
}>;

export type AnyDoc = SightingDoc | SchemaDoc;
