import test from 'ava';
import { get } from 'svelte/store';
import { documentVisibilityState } from './documentVisibilityState.js';
import { subscribe } from './test-utils.js';

test('storageValue uses current visibility', (t) => {
	Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true });
	t.is(get(documentVisibilityState()), 'visible');

	Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
	t.is(get(documentVisibilityState()), 'hidden');
});

test('storageValue listens to changes', (t) => {
	Object.defineProperty(document, 'visibilityState', { value: 'visible', configurable: true });

	const currentState = subscribe(documentVisibilityState());

	t.is(currentState.value, 'visible');

	Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
	document.dispatchEvent(new Event('visibilitychange'));

	t.is(currentState.value, 'hidden');
});
