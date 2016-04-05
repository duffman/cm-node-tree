/**
 *	ZynapticNode
 *	@author Patrik Forsberg <mail@patrikforsberg.net>
 *	@web www.patrikforsberg.net
 *
 *	This is a simple demo implementation of an XML node
 */

/// <reference path="../typings/main.d.ts" />

"use strict";

import { ZynapticNode } from "../zynaptic-node";

class ZynapticXmlNode extends ZynapticNode {
	constructor(name: string, parent?: ZynapticXmlNode) {
		super(name, parent);
	}
}

export { ZynapticXmlNode }