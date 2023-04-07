import { writable } from 'svelte/store';

/**
 *
 * @template T
 * @param {Promise<T>} promise
 * @returns {import("svelte/store").Readable<PromiseSettledResult<T> | undefined>}
 */
export function promiseSettled(promise) {
	/** @type {import("svelte/store").Writable<PromiseSettledResult<T> | undefined>} */
	const store = writable(undefined);
	promise.then(
		(value) => store.set({ status: 'fulfilled', value }),
		(reason) => store.set({ status: 'rejected', reason })
	);

	return {
		subscribe: store.subscribe
	};
}
