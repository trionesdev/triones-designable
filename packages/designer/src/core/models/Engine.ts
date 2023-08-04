import {ITreeNode, TreeNode} from "./TreeNode";
import {Workbench} from "./Workbench";
import {Event, globalThisPolyfill, IEventProps, uid} from "../../shared";
import {Workspace} from "./Workspace";
import {Cursor} from "./Cursor";

export type EngineProps<T = Event> = IEventProps<T> &{
    sourceIdAttrName?: string //拖拽源Id的dom属性名
    nodeIdAttrName?: string //节点Id的dom属性名
    contentEditableAttrName?: string //原地编辑属性名
    contentEditableNodeIdAttrName?: string //原地编辑指定Node Id属性名
    clickStopPropagationAttrName?: string //点击阻止冒泡属性
    outlineNodeIdAttrName?: string //大纲树节点ID的dom属性名
    nodeSelectionIdAttrName?: string //节点工具栏属性名
    nodeDragHandlerAttrName?: string //节点拖拽手柄属性名
    screenResizeHandlerAttrName?: string
    nodeResizeHandlerAttrName?: string //节点尺寸拖拽手柄属性名
    nodeTranslateAttrName?: string // 节点自由布局的属性名
    defaultComponentTree?: ITreeNode //默认组件树
    rootComponentName?: string
}

export class Engine extends Event{
    id: string
    props?: EngineProps
    cursor: Cursor
    workbench?: Workbench
    workspace?:Workspace

    constructor(props: EngineProps) {
        super(props)
        this.props = {
            ...Engine.defaultProps,
            ...props
        }
        this.init()
        this.id = uid()
    }

    init() {

        this.workbench = new Workbench(this)
        this.cursor = new Cursor(this)
    }

    setCurrentTree(tree?: ITreeNode) {
        if (this.workbench.currentWorkspace) {
            this.workbench.currentWorkspace.operation.tree.from(tree)
        }
    }

    getCurrentTree() {
        return this.workbench?.currentWorkspace?.operation?.tree
    }

    getAllSelectedNodes() {
        let results: TreeNode[] = []
        for (let i = 0; i < this.workbench.workspaces.length; i++) {
            const workspace = this.workbench.workspaces[i]
            results = results.concat(workspace.operation.selection.selectedNodes)
        }
        return results
    }

    findNodeById(id: string) {
        return TreeNode.findById(id)
    }

    findMovingNodes(): TreeNode[] {
        const results = []
        this.workbench.eachWorkspace((workspace) => {
            workspace.operation.moveHelper.dragNodes?.forEach((node) => {
                if (!results.includes(node)) {
                    results.push(node)
                }
            })
        })
        return results
    }

    createNode(node: ITreeNode, parent?: TreeNode) {
        return new TreeNode(node, parent)
    }

    mount() {
        this.attachEvents(globalThisPolyfill)
    }

    unmount() {
        this.detachEvents()
    }

    static defaultProps: EngineProps = {
        // shortcuts: [],
        effects: [],
        drivers: [],
        rootComponentName: 'Root',
        sourceIdAttrName: 'data-designer-source-id',
        nodeIdAttrName: 'data-designer-node-id',
        contentEditableAttrName: 'data-content-editable',
        contentEditableNodeIdAttrName: 'data-content-editable-node-id',
        clickStopPropagationAttrName: 'data-click-stop-propagation',
        nodeSelectionIdAttrName: 'data-designer-node-helpers-id',
        nodeDragHandlerAttrName: 'data-designer-node-drag-handler',
        screenResizeHandlerAttrName: 'data-designer-screen-resize-handler',
        nodeResizeHandlerAttrName: 'data-designer-node-resize-handler',
        outlineNodeIdAttrName: 'data-designer-outline-node-id',
        nodeTranslateAttrName: 'data-designer-node-translate-handler',
    }
}