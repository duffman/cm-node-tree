/**
 * @name Zynaptic Node
 * @description 
 * @date 2015-03-12
 * @author Patrik Fosberg <mail@patrikforsberg.net>
 * @web www.patrikforsberg.net
 * @copyright Patrik Forsberg, some rights reserved
 * 
 * @history
 * TypeScript implementation of my old work horse
 * PutteNode, written in Object Pascal, the original
 * implementation as well as C#, Java and Erlang
 * implementations can be found here:
 * www.patrik.guru/zynaptic-node/implementations
 * 
 * In order to use this piece of software, this file header
 * must remain intact.
 * 
 * Zynaptic Node is licensed under the Creative Commons
 * ### License, for more information, follow this link:
 * https://creativecommons.org
*/

/// <reference path="typings/main.d.ts" />


/** DEEP TRAVERSAL
 
 
 var findObjectByLabel = function(obj, label) {
    if(obj.label === label) { return obj; }
    for(var i in obj) {
        if(obj.hasOwnProperty(i)){
            var foundLabel = findObjectByLabel(obj[i], label);
            if(foundLabel) { return foundLabel; }
        }
    }
    return null;
};
 
 */

const ROOT_NODE_NAME = "root";

import { KeyValueModel } from "./core/key-value.model"

// External Dependency
//import { TurboTerminal } from "../zynaptic.turboterminal/turbo-terminal"

interface StructuredNode {
    ChildNodes: StructuredNode[];
}

class ZynapticNode { // implements StructuredNode {
	public parentNode: ZynapticNode = null;
    public nodeName: string; 
    //ChildNodes: StructuredNode[];
	public childNodes: ZynapticNode[];


    constructor(nodeName?: string, parentNode?: ZynapticNode) {
		if (nodeName === undefined) {
			this.nodeName = ROOT_NODE_NAME;
		}
		
		this.parentNode = parentNode;
        this.childNodes =  []; 
    }
    
    get NodeName(): string {
        return this.nodeName;
    }
    
    set NodeName(value: string) {
        this.nodeName = value;
    }

    public newChildNode(nodeName?: string): ZynapticNode {
        var newNode = new ZynapticNode(nodeName);
		console.log('NewNode', newNode);
		
        this.childNodes.push(newNode, this);
	
        return newNode;
    }
	
	/********************************************************
	 * 
	 * 		Attribute Related Functionality
	 * 
	 ********************************************************/
	public findAttribute(name: String): KeyValueModel {
		var keyValuePair = null;
		
		return keyValuePair;	
	}

	public putAttrib(name: string, value: any) {
		
	}

	public getAttributeValue(name: string): any {
		
	}
	

}

export { ZynapticNode }
