import {Engine} from "./Engine";
import {TreeNode} from "./TreeNode";
import {Workspace} from "./Workspace";

export class Operation {
    workspace: Workspace
    engine?: Engine
    tree?: TreeNode

    constructor(workspace: Workspace) {
        this.engine = workspace.engine
        this.workspace = workspace
        this.tree = new TreeNode({
            componentName: this.engine?.props?.rootComponentName,
            ...this.engine?.props?.defaultComponentTree,
            operation: this,
        })
    }
}