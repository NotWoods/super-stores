import { readable } from 'svelte/store';

/**
 * Subscribe to the fragment identifier of the current URL -
 * the `'#'` and everything following it.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Location/hash
 * @returns {import("svelte/store").Readable<string>}
 */
export function locationHash() {
	return readable(location.hash, (set) => {
		const handler = () => set(location.hash);
		window.addEventListener('hashchange', handler);
		return () => window.removeEventListener('hashchange', handler);
	});
}
