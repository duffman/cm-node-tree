/**
 *	ZynapticNode
 *	@author Patrik Forsberg <mail@patrikforsberg.net>
 *	@web www.patrikforsberg.net
 */

/// <reference path="../typings/main.d.ts" />

"use strict";

import { ZynapticNode } from "../zynaptic-node";
import { IZynapticNodeFormatter } from "./zynaptic-node.formatter";

class ZynapticNodeXmlFormatter implements IZynapticNodeFormatter {
	xmlRootNode: ZynapticNode;
	
	constructor() { }

	public assignNode(node: ZynapticNode) {
		this.xmlRootNode = node;
	}

	/**
	 * This function returns a string (XML) representation of the
	 * node and it's children
	*/
	processNode(zynNode: ZynapticNode, xmlData: Array<string>) {
		var previousNode: ZynapticNode;
				
		xmlData.push("<" + zynNode.nodeName);
		
		/**
		 * Append attributes
		 */
		for (var attrName in zynNode.attributes) {
			var attrValue = zynNode.attributes[attrName];
						
			xmlData.push(" ");
			xmlData.push(attrName);
			xmlData.push('="');
			xmlData.push(attrValue.toString());
			xmlData.push('"');
		}
	
		if (!zynNode.haveChildNodes() && !zynNode.empty()) {
			xmlData.push(">" + zynNode.nodeValue + "</" + zynNode.nodeName + ">");
		} else if (zynNode.haveChildNodes()) {
			xmlData.push(">");
		} else if (!zynNode.haveChildNodes() && zynNode.empty()) {
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

	public toString(): string {
		var node = this.xmlRootNode;
		var xmlData: string[]  = new Array<string>();
		
		xmlData.push('<?xml version="1.0" standalone="yes" ?>');
		
		while (node != null) {
			this.processNode(node, xmlData);
			node = node.getNextSibling();
		}
		
		return xmlData.join("");
	}
}

export { ZynapticNodeXmlFormatter }