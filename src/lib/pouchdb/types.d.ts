/// <reference types="pouchdb-core" />

export type SightingDoc = {
	identification: string;
	location: string;
	time: number;
} & Core.ExistingDocument;
