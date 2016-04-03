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
	processNode(zynNode: ZynXmlNode, xmlString: string) {
		var previousNode: ZynXmlNode;
		
		xmlString += "<" + zynNode.nodeName;
		
		/**
		 * Append attributes
		 */
		for (var i = 0; i < zynNode.childNodes.length; i++) {
			
		}
	
		if (!zynNode.haveChildNodes && !zynNode.empty()) {
			xmlString += ">" + zynNode.nodeValue + "</" + zynNode.nodeName + ">";
		} else if (zynNode.haveChildNodes()) {
			xmlString += ">";
		} else if (!zynNode.haveChildNodes() && !zynNode.empty()) {
			xmlString += "/>";
		}
		
		zynNode = zynNode.getFirstChild();
		previousNode = null;
		
		while (zynNode != null) {
			this.processNode(zynNode, xmlString);
			previousNode = zynNode;
			zynNode = zynNode.getNextSibling();
		}

		if (previousNode != null && previousNode.parentNode != null) {
			xmlString += "</" + previousNode.parentNode.nodeName + '>';
		}
	}

	public toXmlString() {
		var node = (ZynXmlNode)this;
		var xmlString: string = "";
		
		while (node != null) {
			this.processNode(node, xmlString);
			node = node.
		}
		
	}

    // Single or double quoting
    Quote := '"';
    if (SingleQuote) then
    	Quote := D_DELIM;

	Node := Self;

	while (Node<> nil) do
	begin
		ProcessNode(Node, Result);
		Node := Node.GetNextSibling();

	end; // end while


end; // end TWfmXmlNode.PutAttrib		
	}	
	
	
}