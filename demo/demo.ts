
var path = require("path");
var fs = require("fs");

import { ZynapticNode, IZynapticNodeList } from "../zynaptic-node";
import { ZynapticXmlNode }  from "./zynaptic-xml-node";
import { ZynapticNodeXmlFormatter } from "../formatters/zynaptic-node-xml.formatter";

class ZynapticNodeSample {
	xmlNode: ZynapticXmlNode;
	
	constructor() {
		console.log("Zynaptic Node Sample");
	}

	echoNodeList(list: IZynapticNodeList) {
		for (var i = 0; i < list.length; i++) {
			var node = list[i];
			console.log(node.nodeName);
		}
	}

	addChildrenFromFile(node: ZynapticXmlNode, filename: string) {
		var fileName = "./demo/text/" + filename;
				
		console.log("Reading File", filename);
				
		var fileContents = fs.readFileSync(fileName).toString().split('\n');
		var numberOfLines = fileContents.length;
		
		console.log("Number of lines in file", numberOfLines);
		
		for (var index in fileContents) {
			var line = fileContents[index];
			node.addChildNode(line);
		}
		
		return node;
	}

	runSample() {
		this.xmlNode = new ZynapticXmlNode("root");
		var cars = this.xmlNode.addChildNode("Cars");

		var animals = this.xmlNode.addChildNode("Animals");
		this.addChildrenFromFile(animals, "animals.txt");

		var artists = this.xmlNode.addChildNode("Artists");
		var countries = this.xmlNode.addChildNode("Countries");
		var misc = this.xmlNode.addChildNode("Miscellaneous");
		var candy = this.xmlNode.addChildNode("Candy");
		var instruments = this.xmlNode.addChildNode("Instruments");

			misc.addChildNode("ZynapticTurboTerminal").putAttribute("version", 3);
			var badger = misc.addChildNode("ZybapticBadger").putAttribute("version", 0);
				var todo = badger.addChildNode("ZynapticTodo");
					todo.addChildNode("RecursiveDirectoryWalker").putAttribute("progress", false);
					todo.addChildNode("FuzzyFileMatcher").putAttribute("progress", "though one");
					todo.addChildNode("FileStringFinder").putAttribute("progress", "have a good idea for a solution");
			misc.addChildNode("ZybapticViewEngine")
				.putAttribute("version", "1")
				.putAttribute("License", "MIT");
			misc.addChildNode("ZybapticNode").nodeValue = "works great";
			
		var firstChild = this.xmlNode.getFirstChild();
		
		var xmlFormatter = new ZynapticNodeXmlFormatter();
		xmlFormatter.assignNode(this.xmlNode);
		var xmlData = xmlFormatter.toString();

		console.log(" ");
		console.log(" ");
		console.log(" ");
		
		console.log("xmlData", xmlData);
	}
	
	printNode(name: string, node: ZynapticNode) {
		if (node != null) {
			console.log(name, node.nodeName);
		} else {
			console.log(name, "IS null");
		}		
	}
	
}

var zynNodeSample = new ZynapticNodeSample();
zynNodeSample.runSample();