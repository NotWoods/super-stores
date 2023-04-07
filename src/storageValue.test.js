import test from 'ava';
import { get } from 'svelte/store';
import { storageValue } from './storageValue.js';
import { subscribe } from './test-utils.js';

/**
 * @implements {Storage}
 */
class MemoryStorage {
	/** @type {Map<string, string>} */
	#data = new Map();

	constructor() {}

	get length() {
		return this.#data.size;
	}

	clear() {
		this.#data.clear();
	}

	/** @param {string} key */
	getItem(key) {
		return this.#data.get(key) ?? null;
	}

	/** @param {string} key */
	removeItem(key) {
		this.#data.delete(key);
	}

	/**
	 * @param {string} key
	 * @param {string} value
	 */
	setItem(key, value) {
		this.#data.set(key, value);
	}

	/** @param {number} index */
	key(index) {
		let i = 0;
		for (const key of this.#data.keys()) {
			if (i === index) {
				return key;
			}

			i++;
		}
		return null;
	}
}

test('reads storage value', (t) => {
	const storage = new MemoryStorage();
	storage.setItem('foo', 'bar');

	t.is(get(storageValue('foo', { storage })), 'bar');
	t.is(get(storageValue('baz', { storage })), null);
});

test('writes storage value', (t) => {
	const storage = new MemoryStorage();
	storage.setItem('foo', 'bar');

	const store = storageValue('foo', { storage });
	t.is(get(store), 'bar');

	store.set('baz');
	t.is(storage.getItem('foo'), 'baz');

	store.set(null);
	t.is(storage.getItem('foo'), null);
});

test('subscribes to storage value changes', (t) => {
	const storage = new MemoryStorage();
	storage.setItem('foo', 'bar');

	const currentState = subscribe(storageValue('foo', { storage }));

	window.dispatchEvent(
		new StorageEvent('storage', {
			key: 'foo',
			newValue: 'baz'
		})
	);

	t.is(currentState.value, 'baz');

	window.dispatchEvent(
		new StorageEvent('storage', {
			key: 'qux',
			newValue: 'bar'
		})
	);

	t.is(currentState.value, 'baz');
});
