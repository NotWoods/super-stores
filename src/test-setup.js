// @ts-ignore mock the window object
globalThis.window ||= new EventTarget();

// @ts-ignore mock the document object
globalThis.document ||= new EventTarget();

globalThis.StorageEvent = class StorageEvent extends Event {
	/**
	 * @param {string} name
	 * @param {StorageEventInit} [init]
	 */
	constructor(name, init) {
		super(name, init);
		Object.assign(this, init);
	}
};
