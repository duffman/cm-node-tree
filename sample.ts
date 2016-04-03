
var term = require("../zynaptic.turboterminal/turbo-terminal");

import { ZynNode, ZynXmlNode, IZynArray } from "./zynaptic-node";

class ZynapticNodeSample {
	terminal = term.TurboTerminal;
	xmlNode: ZynXmlNode;
	
	constructor() {
		this.terminal = new term.TurboTerminal();
		this.terminal.echoPurple("TurboTerminal Sample");
	}

	echoNodeList(list: IZynArray) {
		for (var i = 0; i < list.length; i++) {
			var node = list[i];
			console.log(node.nodeName);
		}
	}

	runSample() {
		this.xmlNode = new ZynXmlNode("root");
		var products = this.xmlNode.addChildNode("products");
			products.addChildNode("Zybaptic Turbo Terminal").putAttribute("1/5", 3);
			var badger = products.addChildNode("Zybaptic Badger").putAttribute("1/5", 0);
				var todo = badger.addChildNode("TODO");
					todo.addChildNode("Recursive Directory Walker").putAttribute("progress", false);
					todo.addChildNode("Fuzzy File Matcher").putAttribute("progress", 0.50);
					todo.addChildNode("File String Finder").putAttribute("progress", "have a good idea for a solution");
			products.addChildNode("Zybaptic View Engine").putAttribute("1/5", 0);
			products.addChildNode("Zybaptic Node").putAttribute("1/5", 4);
			
		
		console.log(this.xmlNode.getFirstChild().nodeName);
		
	}
}

var zynNodeSample = new ZynapticNodeSample();
zynNodeSample.runSample();