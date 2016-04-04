/**
 *	@name Zynaptic Node
 *	@description	
 *	@author Patrik Forsberg <mail@patrikforsberg.net>
 *	@web www.patrikforsberg.net
 *	@copyright Patrik Forsberg, some rights reserved
 * 
 *	@history
 *	TypeScript implementation of my old work horse
 *	PutteNode, written in Object Pascal, the original
 *	implementation as well as C#, Java and Erlang,
 *	these implementations can be found here:
 *	www.patrikforsberg.net/zynaptic-node/implementations
 * 
 *	In order to use this piece of software, this file header
 *	must remain intact.
 * 
 *	Zynaptic Node is licensed under the Creative Commons
 *	### License, for more information, follow this link:
 *	https://creativecommons.org
*/

/// <reference path="typings/main.d.ts" />

"use strict";

const DEBUG = false;

var term = require("../zynaptic.turboterminal/turbo-terminal");

interface IZynArray {
	[position: number]: ZynapticNode;
	length: number;
	push(item: ZynapticNode): number;
}

interface IAttributeList {
	length: number;
    [key: string]: any;
};

interface IZynapticNode {
	parentNode: ZynapticNode;
	nodeName: string;
	nodeValue: string;
	childNodes: IZynArray;	
	addChildNode(name: string): ZynapticNode;
	childCount(): number;
}

class ZynapticNode {
	public parentNode: ZynapticNode = null;
	public nodeName: string = "";
	public nodeValue: string = "";
	public childNodes: IZynArray = new Array<ZynapticNode>();
	private attributes: IAttributeList = [{}];
		
	constructor(name: string, parent?: ZynapticNode) {
		this.nodeName = name;		
		this.parentNode = parent;
	}
	
	public addChildNode(name: string): ZynapticNode {
		var childNode = new ZynapticNode(name, this);
		this.childNodes.push(childNode);
		
		return childNode;
	}
	
	public childCount(): number {
		return this.childNodes.length;
	}
	
	public empty(): boolean {
		return this.nodeValue.length == 0;
	}
	
	/**
	 * 
	 */
	public getFirstChild(): ZynapticNode {
		if (this.childNodes.length > 0) {
			return this.childNodes[0];
		}
		return null;
	}
	
	/**
	 * 
	 */
	public getFirstChildNodeName(): string {
		var firstChildNodeName = "";
		var firstChildNode = this.getFirstChild();
		
		if (firstChildNode != null) {
			firstChildNodeName = firstChildNode.nodeName;
		}
		
		return firstChildNodeName;
	}
	
	/**
	 * 
	 */
	public getLastChild(): ZynapticNode {
		var childNode: ZynapticNode = null;
		var childNodes = this.childNodes;
		
		if (childNodes.length > 0) {
			childNode = childNodes[childNodes.length-1];
		}
		
		return childNode;		
	}
	
	/**
	 * 
	 */
	public isLastChild() {
		var lastChild = false;
		
		if (this.parentNode != null) {
			var nodeIndex = this.parentNode.getChildNodeIndex(this);
			if (nodeIndex == this.parentNode.childCount()-1) {
				lastChild = true;	
			}
		}
		
		return lastChild;
	}	
	
	/**
	 * 
	 */
	public haveChildNodes(): boolean {
		return this.getFirstChild() != null;
	}
	
	/**
	 * 
	 */
	public getChildNodeIndex(node: ZynapticNode): number {
		var nodeIndex: number = -1;

		for (var i = 0; i < this.childNodes.length; i++) {
			var childNode = this.childNodes[i];
			if (childNode === node) {
				nodeIndex = i;
				break;	
			}
		}

		return nodeIndex;
	}	

	public numberOfSiblings(): number {
		var siblingsCount = 0;
		if (this.parentNode != null) {
			siblingsCount = this.parentNode.childCount();
		}
		return siblingsCount;
	}

	public getPreviousSibling(): ZynapticNode {
		var node: ZynapticNode = null;
	
		if (this.parentNode != null) {
			var nodeIndex = this.parentNode.getChildNodeIndex(this);
			var previousNodeIndex = nodeIndex-1;
			if (previousNodeIndex>-1) {
				node = this.parentNode.childNodes[previousNodeIndex];
			}
		}	
	
		return node;
	}
	
	public getNextSibling(): ZynapticNode {
		var node: ZynapticNode = null;
		
		if (this.parentNode != null) {
			var nodeIndex = this.parentNode.getChildNodeIndex(this);

			if (DEBUG) console.log('>>> getNextSibling > Node Index', nodeIndex);
			
			var nextNodeIndex = nodeIndex+1;
			var numberOfSiblings = this.parentNode.childNodes.length;
			
			if (nodeIndex>-1 && nextNodeIndex <= numberOfSiblings-1) {
				node = this.parentNode.childNodes[nextNodeIndex];
			}
		}
		
		return node;
	}
	
	public getChildNodeByName(name: string, ignoreCase?: boolean): ZynapticNode {
		var node: ZynapticNode = null;

		// TODO: Do a more thorough investigation on the perfomance impacts
		// of using Regular Expressions for comparison method 
		for (var index in this.childNodes) {
			var childNode = this.childNodes[index];
			var childNodeName = childNode.nodeName;
			
			if (ignoreCase) {
				name = name.toLowerCase();
				childNodeName = childNodeName.toLowerCase();
			}
			
			if (name === childNodeName) {
				node = childNode;
				break;
			}
		}

		return node;
	}
	
	/**
	 * Return ZynNode to enable chaining when putting
	 * attributes...
	 */
	public putAttribute(key: string, value: any): ZynapticNode {
		this.attributes[key] = value;
		return this;
	}
	
	public hasAttributeName(name: string): boolean {
		return (this.childNodes[name] != undefined);
	}

	public getNodesWithAttribute(attributeName: string): IZynArray {
		var nodes: IZynArray = new Array<ZynapticNode>();
		
		return nodes;
	}

	public getAttribute(key: string): any {
		return this.attributes[key];
	}
}

// -- Sample XML Document -- //
class ZynXmlNode extends ZynapticNode {
	constructor(name: string, parent?: ZynapticNode) {
		super(name, parent);
	}	
}

export { ZynapticNode, ZynXmlNode, IZynArray }