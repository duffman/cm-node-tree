/**
 * Zynaptic node sample
 */

import { ZynapticNode } from "./zynaptic-node";
// External Dependency
//import { TurboTerminal } from "../zynaptic.turboterminal/turbo-terminal"
var term = require("../zynaptic.turboterminal/turbo-terminal");

/**
 * 	Sample 1: Creating a structured node tree using the
 *	Zynaptic Node implementation
 */
class ZynapticNodeSample {
	terminal = term.TurboTerminal;
	rootNode: ZynapticNode;
	
	constructor() {
		this.terminal = new term.TurboTerminal();
		
		this.terminal.echoPurple("Hello Hey");
	}
	
	runSample() {
		this.rootNode = new ZynapticNode();

		var child = this.rootNode.newChildNode("Programming Languages");
		child.putAttrib("ove", true);

		console.log(this.rootNode.ChildNodes);	
	}
}

var zynNodeSample = new ZynapticNodeSample();

