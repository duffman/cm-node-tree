/**
 *	ZynapticNode
 *	@author Patrik Forsberg <mail@patrik.guru>
 *	@web https://github.com/duffman/zynaptic.node
 */

/// <reference path="../typings/main.d.ts" />

"use strict";

import { ZynapticNode } from "../zynaptic-node"

interface IZynapticNodeFormatter {
	assignNode(node: ZynapticNode);
	toString(): string;
}

export { IZynapticNodeFormatter }