/**
 *	@name Zynaptic Node
 *	@description	
 *	@date 2015-03-	2
 *	@author Patrik Forsberg <mail@patrik.guru>
 *	@web www.patrik.guru
 *	@copyright Patrik Forsberg, some rights reserved
 * 
 *	@history
 *	TypeScript implementation of my old work horse
 *	PutteNode, written in Object Pascal, the original
 *	implementation as well as C#, Java and Erlang,
 *	these implementations can be found here:
 *	www.patrik.guru/zynaptic-node/implementations
 * 
 *	In order to use this piece of software, this file header
 *	must remain intact.
 * 
 *	Zynaptic Node is licensed under the Creative Commons
 *	### License, for more information, follow this link:
 *	https://creativecommons.org
*/

/// <reference path="typings/main.d.ts" />

var term = require("../zynaptic.turboterminal/turbo-terminal");

interface IZynArray {
	[position: number]: ZynNode;
	length: number;
	push(item: ZynNode): number;
}

interface IAttributeList {
	length: number;
    [key: string]: any;
};

interface IZynNode {
	parentNode: ZynNode;
	nodeName: string;
	nodeValue: string;
	childNodes: IZynArray;	
	addChildNode(name: string): ZynNode;
	numberOfChildNodes(): number;
}

class ZynNode { //} implements IZynNode {
	public parentNode: ZynNode = null;
	public nodeName: string = "";
	public nodeValue: string = "";
	public childNodes: IZynArray = new Array<ZynNode>();
	private attributes: IAttributeList = [{}];
		
	constructor(name: string, parent?: ZynNode) {
		this.nodeName = name;		
		this.parentNode = parent;
	}
	
	public addChildNode(name: string): ZynNode {
		var childNode = new ZynNode(name, this);
		this.childNodes.push(childNode);
		
		return childNode;
	}
	
	public numberOfChildNodes(): number {
		return this.childNodes.length;
	}
	
	public empty(): boolean {
		return this.nodeValue.length == 0;
	}
	
	/**
	 * 
	 */
	public getFirstChild(): ZynNode {
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
	public getLastChild(): ZynNode {
		var childNode: ZynNode = null;
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
			if (nodeIndex == this.parentNode.numberOfChildNodes()-1) {
				lastChild = true;	
			}
		}
		
		return lastChild;
	}	
	
	/**
	 * 
	 */
	public haveChildNodes(): boolean {
		return this.getFirstChild != null;
	}
	
	/**
	 * 
	 */
	public getChildNodeIndex(node: ZynNode): number {
		var nodeIndex: number = -1;

		for (var i = 0; i < this.childNodes.length; i++) {
//		for (var index in this.childNodes) {
			var childNode = this.childNodes[i];
			if (childNode === node) {
				nodeIndex = i;
				break;	
			}
		}

		return nodeIndex;
	}	

	public getPreviousSibling(): ZynNode {
		var node: ZynNode = null;
	
		if (this.parentNode != null) {
			var nodeIndex = this.parentNode.getChildNodeIndex(this);
			var previousNodeIndex = nodeIndex-1;
			if (previousNodeIndex>-1) {
				node = this.parentNode.childNodes[previousNodeIndex];
			}
		}	
	
		return node;
	}
	
	public getNextSibling(): ZynNode {
		var node: ZynNode = null;
		
		if (this.parentNode != null) {
			var nodeIndex = this.parentNode.getChildNodeIndex(this);
			console.log('>>> Node Index', nodeIndex);
			
			var nextNodeIndex = nodeIndex+1;
			var numberOfSiblings = this.parentNode.childNodes.length;
			
			if (nodeIndex>-1 && nextNodeIndex <= numberOfSiblings-1) {
				node = this.parentNode.childNodes[nextNodeIndex];
			}
		}
		
		return node;
	}
	
	public getChildNodeByName(name: string, ignoreCase?: boolean): ZynNode {
		var node: ZynNode = null;

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
	public putAttribute(key: string, value: any): ZynNode {
		this.attributes[key] = value;
		return this;
	}
	
	public hasAttributeName(name: string): boolean {
		return (this.childNodes[name] != undefined);
	}

	public getNodesWithAttribute(attributeName: string): IZynArray {
		var nodes: IZynArray = new Array<ZynNode>();
		
		return nodes;
	}

	public getAttribute(key: string): any {
		return this.attributes[key];
	}
}

// -- Sample XML Document -- //
class ZynXmlNode extends ZynNode {
	constructor(name: string, parent?: ZynNode) {
		super(name, parent);
	}	
}

export { ZynNode, ZynXmlNode, IZynArray }