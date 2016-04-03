/// <reference path="../typings/main.d.ts" />

"use strict";

class KeyValueModel {
	public key: string = "";
	public value: string = "";

	constructor(key: string, value?: string) {
		this.key = key;
		this.value = value;		
	}
}

export {KeyValueModel}