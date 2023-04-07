import { writable } from 'svelte/store';

/**
 * Read and write from the Web Storage API, including `localStorage` and `sessionStorage`.
 * Automatically synchronizes across multiple tabs.
 *
 * @param {string} key The key to store the value in localStorage.
 * @param {object} [options]
 * @param {Storage} [options.storage] The Web `Storage` object to use. Defaults to `localStorage`.
 * @param {boolean} [options.autoUpdate] Whether to sync value across tabs. Defaults to `true`.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage
 * @returns {import("svelte/store").Writable<string | null>}
 */
export function storageValue(key, options = {}) {
	const { storage = localStorage, autoUpdate = true } = options;

	const store = writable(
		storage.getItem(key),
		autoUpdate
			? (set) => {
					/** @param {StorageEvent} event */
					const handler = (event) => {
						console.log(event.key);
						if (event.key === key) {
							set(event.newValue);
						}
					};
					window.addEventListener('storage', handler);
					return () => window.removeEventListener('storage', handler);
			  }
			: undefined
	);

	/**
	 * Write to or remove from storage.
	 * @param {string | null} value
	 */
	function writeItem(value) {
		if (value === null) {
			storage.removeItem(key);
		} else {
			storage.setItem(key, value);
		}
	}

	return {
		subscribe: store.subscribe,
		set(value) {
			writeItem(value);
			store.set(value);
		},
		update(updater) {
			store.update((oldValue) => {
				const newValue = updater(oldValue);
				writeItem(newValue);
				return newValue;
			});
		}
	};
}
