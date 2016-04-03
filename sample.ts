/**
 * Zynaptic node sample
 */

import { ZynapticNode } from "./zynaptic-node";
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

class ZynNode {
	public parentNode: ZynNode = null;
	public nodeName: string = "";
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

class ZynapticNodeSample {


	terminal = term.TurboTerminal;
	rootNode: ZynapticNode;
	
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
		var xmlNode = new ZynXmlNode("root");
		var products = xmlNode.addChildNode("products");
			products.addChildNode("Zybaptic Turbo Terminal").putAttribute("1/5", 3);
			var badger = products.addChildNode("Zybaptic Badger").putAttribute("1/5", 0);
				var todo = badger.addChildNode("TODO");
					todo.addChildNode("Recursive Directory Walker").putAttribute("progress", false);
					todo.addChildNode("Fuzzy File Matcher").putAttribute("progress", 0.50);
					todo.addChildNode("File String Finder").putAttribute("progress", "have a good idea for a solution");
			products.addChildNode("Zybaptic View Engine").putAttribute("1/5", 0);
			products.addChildNode("Zybaptic Node").putAttribute("1/5", 4);
			
		
	}

		
		/*
		var rootNode = new ZynNode("root");
		var cpNode = rootNode.addChildNode("Zeppo");
		var child1 = rootNode.addChildNode("child1");
			var child1a = child1.addChildNode("child1a");
			var child1b = child1.addChildNode("child1b");
			var child1c = child1.addChildNode("child1c");

		var child3 = rootNode.addChildNode("child3");
		var child4 = rootNode.addChildNode("child4");
		var child2 = rootNode.addChildNode("child2");

		child1.putAttribute("platform", "Windows");
		
		console.log("childIndex", rootNode.getChildNodeIndex(child2));
		
		if (child1c.isLastChild()) {
			console.log("child1b is LAST");
		} else {
			console.log("child1b is NOT LAST");
		}
		
		
		var firstChild = rootNode.getFirstChild();
		var lastChild = rootNode.getLastChild();
		
		if (firstChild != null) {
			console.log("<First Child> Node", firstChild.nodeName);
		} else {
			console.log("<First Child> No Child Nodes");
		}
		
		///
		
		if (lastChild != null) {
			console.log("<Last Child> Node", lastChild.nodeName);
		} else {
			console.log("<Last Child> No Child Nodes");
		}

		console.log("child3 is last child", child3.isLastChild());
		console.log("child2 is last child", child2.isLastChild());

		this.echoNodeList(rootNode.childNodes);
	}
	*/
}

var zynNodeSample = new ZynapticNodeSample();
zynNodeSample.runSample();


/*		var terminal = this.terminal;
		var self = this;
		this.rootNode = new ZynapticNode();
		var root = this.rootNode;

		var child = new ZynapticNode("Languages", root);
		root.childNodes.push()

		var child = this.rootNode.newChildNode("Programming Languages");
		child.putAttrib("ove", true);
		

		var children = root.childNodes;
		for (var i = 0; i < children.length; i++) {
		}

		//	console.log("Child", children[0]);

		this.rootNode.childNodes.forEach(element => {
			terminal.echo(element);
		});

//		this.terminal.echoArray("rootNode.ChildNodes", this.rootNode.ChildNodes);
		
		//terminal.echo("Preparing output...");

		//this.terminal.debugOutput(this.rootNode.childNodes);
	} */