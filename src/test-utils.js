/**
 * @template T
 * @param {import("svelte/store").Readable<T>} store
 * @return {{ readonly value: T }}
 */
export function subscribe(store) {
	/** @type {T} */
	let value;
	store.subscribe((v) => {
		value = v;
	});

	return {
		get value() {
			return value;
		}
	};
}
