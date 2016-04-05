/**
 *	ZynapticNode
 *	@author Patrik Forsberg <mail@patrikforsberg.net>
 *	@web www.patrikforsberg.net
 */

/// <reference path="../typings/main.d.ts" />

"use strict";

import { ZynapticNode } from "../zynaptic-node"

interface IZynapticNodeFormatter {
	assignNode(node: ZynapticNode);
	toString(): string;
}

export { IZynapticNodeFormatter }