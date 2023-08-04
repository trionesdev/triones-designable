import {Engine} from "./Engine";
import {Operation} from "./Operation";
import {EventContainer, ICustomEvent, uid} from "../../shared";
import {History} from "./History";
import {IEngineContext} from "../types";
import {Viewport} from "./Viewport";
import {IWorkspace} from "../../react";

export interface IWorkspaceProps {
    id?: string
    title?: string
    description?: string
    contentWindow?: Window
    viewportElement?: HTMLElement
}

export class Workspace {
    id: string
    title?: string
    description?: string
    engine?: Engine
    viewport: Viewport
    outline: Viewport
    operation?: Operation
    history: History<Workspace>
    props?: IWorkspaceProps

    constructor(engine: Engine, props?: IWorkspaceProps) {
        this.id = props?.id || uid()
        this.props = props
        this.title = props?.title
        this.description = props?.description
        this.engine = engine
        this.viewport = new Viewport({
            engine: this.engine,
            workspace: this,
            viewportElement: props.viewportElement,
            contentWindow: props.contentWindow,
            nodeIdAttrName: this.engine.props.nodeIdAttrName,
            moveSensitive: true,
            moveInsertionType: 'all',
        })
        this.outline = new Viewport({
            engine: this.engine,
            workspace: this,
            viewportElement: props.viewportElement,
            contentWindow: props.contentWindow,
            nodeIdAttrName: this.engine.props.outlineNodeIdAttrName,
            moveSensitive: false,
            moveInsertionType: 'block',
        })
        this.operation = new Operation(this)
    }

    getEventContext(): IEngineContext {
        return {
            workbench: this.engine.workbench,
            workspace: this,
            engine: this.engine,
            viewport: this.viewport,
        }
    }

    attachEvents(container: EventContainer, contentWindow: Window) {
        this.engine.attachEvents(container, contentWindow, this.getEventContext())
    }

    detachEvents(container: EventContainer) {
        this.engine.detachEvents(container)
    }

    dispatch(event: ICustomEvent) {
        return this.engine.dispatch(event, this.getEventContext())
    }

    serialize(): IWorkspace {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            operation: this.operation.serialize(),
        }
    }

    from(workspace?: IWorkspace) {
        if (!workspace) return
        if (workspace.operation) {
            this.operation.from(workspace.operation)
        }
        if (workspace.id) {
            this.id = workspace.id
        }
        if (workspace.title) {
            this.title = workspace.title
        }
        if (workspace.description) {
            this.description = workspace.description
        }
    }
}