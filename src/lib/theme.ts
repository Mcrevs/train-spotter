import { persist } from "$lib/util";

const DEFAULT_ACCENT_HUE = 297.3;

export const accent = persist("accent", DEFAULT_ACCENT_HUE);

accent.subscribe((hue) => {
	document.documentElement.style.setProperty("--accent-hue", hue.toString());
});

export function resetAccent() {
	accent.set(DEFAULT_ACCENT_HUE);
}
