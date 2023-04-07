import { readable } from 'svelte/store';

/**
 * Subscribe to a media query and detect when the document matches (or stops matching) it.
 *
 * @param {string} mediaQuery A string specifying the media query.
 * @example
 * matchMedia('(max-width: 600px)')
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
 * @returns {import("svelte/store").Readable<boolean>}
 */
function matchMediaStore(mediaQuery) {
	const mql = matchMedia(mediaQuery);

	return readable(mql.matches, (set) => {
		const handler = () => set(mql.matches);
		if (mql.addEventListener) {
			mql.addEventListener('change', handler);
			return () => mql.removeEventListener('change', handler);
		} else {
			mql.addListener(handler);
			return () => mql.removeListener(handler);
		}
	});
}

export { matchMediaStore as matchMedia };
