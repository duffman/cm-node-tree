/// <reference path="../typings/main.d.ts" />

import { ZynXmlNode } from "../zynaptic-node";

class ZynNodeXmlFormatter {
	xmlRootNode: ZynXmlNode;
	
	constructor(rootNode: ZynXmlNode) {
		this.xmlRootNode = rootNode;
	}

	/**
	 * This function returns a string (XML) representation of the
	 * node and it's children
	*/
	processNode(zynNode: ZynXmlNode, xmlData: Array<string>) {
		var previousNode: ZynXmlNode;
		
		xmlData.push("<" + zynNode.nodeName);
		
		/**
		 * Append attributes
		 */
		for (var i = 0; i < zynNode.childNodes.length; i++) {
			
		}
	
		if (!zynNode.haveChildNodes && !zynNode.empty()) {
			xmlData.push(">" + zynNode.nodeValue + "</" + zynNode.nodeName + ">");
		} else if (zynNode.haveChildNodes()) {
			xmlData.push(">");
		} else if (!zynNode.haveChildNodes() && !zynNode.empty()) {
			xmlData.push("/>");
		}
		
		zynNode = zynNode.getFirstChild();
		previousNode = null;
		
		while (zynNode != null) {
			this.processNode(zynNode, xmlData);
			previousNode = zynNode;
			zynNode = zynNode.getNextSibling();
		}

		if (previousNode != null && previousNode.parentNode != null) {
			xmlData.push("</" + previousNode.parentNode.nodeName + '>');
		}
	}

	public toXmlString() {
		var node = this.xmlRootNode;
		var xmlData: Array<string>  = new Array<string>();
		
		while (node != null) {
			this.processNode(node, xmlData);
			node = node.getNextSibling();
		}
	}
}