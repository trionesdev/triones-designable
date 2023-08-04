import {Engine} from "./Engine";
import {ITreeNode, TreeNode} from "./TreeNode";
import {Workspace} from "./Workspace";
import {cancelIdle, ICustomEvent, requestIdle} from "../../shared";
import _ from "lodash";
import {Selection} from "./Selection";
import {Hover} from "./Hover";
import {MoveHelper} from "./MoveHelper";

export interface IOperation {
    tree?: ITreeNode
    selected?: string[]
}

export class Operation {
    workspace: Workspace
    engine?: Engine
    tree?: TreeNode
    selection: Selection
    hover: Hover
    moveHelper: MoveHelper

    requests = {
        snapshot: null,
    }

    constructor(workspace: Workspace) {
        this.engine = workspace.engine
        this.workspace = workspace
        this.tree = new TreeNode({
            componentName: this.engine?.props?.rootComponentName,
            ...this.engine?.props?.defaultComponentTree,
            operation: this,
        })
        this.hover = new Hover({
            operation: this,
        })
        this.selection = new Selection({
            operation: this,
        })
        this.moveHelper = new MoveHelper({
            operation: this,
        })
    }

    dispatch(event: ICustomEvent, callback?: () => void) {
        if (this.workspace.dispatch(event) === false) return
        if (_.isFunction(callback)) return callback()
    }

    snapshot(type?: string) {
        cancelIdle(this.requests.snapshot)
        if (
            !this.workspace ||
            !this.workspace.history ||
            this.workspace.history.locking
        )
            return
        this.requests.snapshot = requestIdle(() => {
            this.workspace.history.push(type)
        })
    }

    from(operation?: IOperation) {
        if (!operation) return
        if (operation.tree) {
            this.tree.from(operation.tree)
        }
        if (operation.selected) {
            this.selection.selected = operation.selected
        }
    }

    serialize(): IOperation {
        return {
            tree: this.tree.serialize(),
            selected: [this.tree.id],
        }
    }

}