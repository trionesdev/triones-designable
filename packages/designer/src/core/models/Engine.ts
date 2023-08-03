import {ITreeNode} from "./TreeNode";
import {Workbench} from "./Workbench";
import {uid} from "../../shared";
import {Workspace} from "./Workspace";

export type EngineProps = {
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

export class Engine {
    id: string
    props?: EngineProps
    workbench?: Workbench
    workspace?:Workspace

    constructor(props: EngineProps) {
        this.props = {
            ...Engine.defaultProps,
            ...props
        }
        this.init()
        this.id = uid()
    }

    init() {
        this.workbench = new Workbench(this)
    }

    static defaultProps: EngineProps = {
        // shortcuts: [],
        // effects: [],
        // drivers: [],
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