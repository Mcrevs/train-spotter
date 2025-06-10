import { type IconDefinition } from "@fortawesome/fontawesome-svg-core";
import * as fortawesome from "@fortawesome/free-solid-svg-icons";

function isIconDefinition(obj: any): obj is IconDefinition {
	return obj && typeof obj === "object" && "iconName" in obj && "prefix" in obj && "icon" in obj;
}

function filter() {
	return Object.fromEntries(
		Object.entries(fortawesome).filter((entry): entry is [string, IconDefinition] =>
			isIconDefinition(entry[1]),
		),
	);
}

export const icons = filter();
