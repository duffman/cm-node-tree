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

var term = require("../zynaptic.turboterminal/turbo-terminal");

/**
 * 	Sample 1: Creating a structured node tree using the
 *	Zynaptic Node implementation
 */

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
		var childNode: ZynNode = null;
		
		if (this.childNodes.length > 0) {
			childNode = this.childNodes[0];
		}
		
		return childNode;
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
			var childNode = this.childNodes[i];
			if (childNode === node) {
				nodeIndex = i;
				break;	
			}
		}

		return nodeIndex;
	}	
	
	public getNextSibling(): ZynNode {
		var node: ZynNode = null;
		
		if (this.parentNode != null) {
			var nodeIndex = this.parentNode.getChildNodeIndex(this);
			console.log('>>> Node Index', nodeIndex);
		}
		
		/*
	if (Parent<>nil) then
		begin
			myIdx := Parent.ChildNodes.IndexOf(Self);
			if (myIdx>-1) and (myIdx+1<=Parent.ChildNodes.Count-1) then
				Result := Parent.ChildNodes[myIdx+1];

		end; // end if
		*/
		
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