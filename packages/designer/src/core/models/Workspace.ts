import {Engine} from "./Engine";
import {Operation} from "./Operation";
import {uid} from "../../shared";

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
    operation?: Operation
    props?: IWorkspaceProps

    constructor(engine: Engine, props?: IWorkspaceProps) {
        this.id = props?.id || uid()
        this.props = props
        this.title = props?.title
        this.description = props?.description
        this.engine = engine
        this.operation = new Operation(this)
    }
}