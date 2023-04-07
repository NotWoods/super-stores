import { derived } from 'svelte/store';

/**
 * @template T
 * @param {T} a
 * @param {T} b
 */
const defaultAreEqual = (a, b) => a === b;

/**
 * Creates a new `store` that doesn't emit until the value has changed.
 * @template T
 * @param {import("svelte/store").Readable<T>} store
 * @param {(a: T, b: T) => boolean} areEqual
 * @returns {import("svelte/store").Readable<T>}
 */
export function distinctUntilChanged(store, areEqual = defaultAreEqual) {
	/** @type {T | undefined} */
	let lastValue;
	return derived(store, (value, set) => {
		if (lastValue === undefined || !areEqual(value, lastValue)) {
			set(value);
			lastValue = value;
		}
	});
}

/**
 * Map from the input `store` by applying `transform` to each value.
 *
 * This can be used to swap between stores while the returned result stays the same,
 * delegating behind the scenes.
 *
 * @template In
 * @template Out
 * @param {import("svelte/store").Readable<In>} store
 * @param {(input: In) => import("svelte/store").Readable<Out>} transform
 * @returns {import("svelte/store").Readable<Out>}
 */
export function switchDerived(store, transform) {
	return derived(store, (value, set) => {
		return transform(value).subscribe(set);
	});
}
