import { readable } from 'svelte/store';

/**
 * Subscribe to document visibility,
 * to know if the document is in the background or an invisible tab.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState
 * @returns {import("svelte/store").Readable<DocumentVisibilityState>}
 */
export function documentVisibilityState() {
	return readable(document.visibilityState, (set) => {
		const handler = () => set(document.visibilityState);
		document.addEventListener('visibilitychange', handler);
		return () => document.removeEventListener('visibilitychange', handler);
	});
}
