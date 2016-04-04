
var path = require("path");
var fs = require("fs");
var term = require("../zynaptic.turboterminal/turbo-terminal");

import { ZynNode, ZynXmlNode, IZynArray } from "./zynaptic-node";

class ZynapticNodeSample {
	terminal = term.TurboTerminal;
	xmlNode: ZynXmlNode;
	
	constructor() {
		this.terminal = new term.TurboTerminal();
		this.terminal.echoPurple("Zynaptic Node Sample");
	}

	echoNodeList(list: IZynArray) {
		for (var i = 0; i < list.length; i++) {
			var node = list[i];
			console.log(node.nodeName);
		}
	}

	addChildrenFromFile(node: ZynXmlNode, filename: string) {
		var terminal = this.terminal;
		var fileName = "./demo/text/" + filename;
				
		terminal.echoGreen("Reading File \"" + filename + "\"");
		
		var fs  = require("fs");
		
		var fileContents = fs.readFileSync(fileName).toString().split('\n');
		var numberOfLines = fileContents.length;
		
		terminal.echoHtml(`Number of lines in file Count: <b>${numberOfLines}</b>`);
		
		for (var index in fileContents) {
			var line = fileContents[index];
			console.log(line);
		}
		
		
		fileContents = null;
		
		return node;
	}

	runSample() {
		this.xmlNode = new ZynXmlNode("root");
		var cars = this.xmlNode.addChildNode("Cars");

		var animals = this.xmlNode.addChildNode("Animals");
		this.addChildrenFromFile(animals, "animals.txt");


		var artists = this.xmlNode.addChildNode("Artists");
		var countries = this.xmlNode.addChildNode("Countries");
		var misc = this.xmlNode.addChildNode("Miscellaneous");
		var candy = this.xmlNode.addChildNode("Candy");
		var instruments = this.xmlNode.addChildNode("Instruments");

			misc.addChildNode("Zybaptic Turbo Terminal").putAttribute("1/5", 3);
			var badger = misc.addChildNode("Zybaptic Badger").putAttribute("1/5", 0);
				var todo = badger.addChildNode("TODO");
					todo.addChildNode("Recursive Directory Walker").putAttribute("progress", false);
					todo.addChildNode("Fuzzy File Matcher").putAttribute("progress", 0.50);
					todo.addChildNode("File String Finder").putAttribute("progress", "have a good idea for a solution");
			misc.addChildNode("Zybaptic View Engine").putAttribute("1/5", 0);
			misc.addChildNode("Zybaptic Node").putAttribute("1/5", 4);
			
		var firstChild = this.xmlNode.getFirstChild();
		
		this.printNode("firstChild", firstChild);
		
		var nextSibling = firstChild.getNextSibling();
		var previousSibling = nextSibling.getPreviousSibling();

		this.printNode("nextSibling", nextSibling);
		this.printNode("nextSibling", nextSibling);

	}
	
	printNode(name: string, node: ZynNode) {
		if (node != null) {
			console.log(name, node.nodeName);
		} else {
			console.log(name, "IS null");
		}		
	}
	
}

var zynNodeSample = new ZynapticNodeSample();
zynNodeSample.runSample();