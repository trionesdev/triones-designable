import {Engine} from "./Engine";
import {IWorkspaceProps, Workspace} from "./Workspace";
import {action, define, observable} from "@formily/reactive";
import {AddWorkspaceEvent, SwitchWorkspaceEvent} from "../events";

export type WorkbenchTypes =
    | 'DESIGNABLE'
    | 'PREVIEW'
    | 'JSONTREE'
    | 'MARKUP'
    | (string & {})

export class Workbench {
    engine: Engine
    workspaces: Workspace[]
    currentWorkspace:Workspace
    activeWorkspace: Workspace
    type: WorkbenchTypes = 'DESIGNABLE'
    constructor(engine: Engine) {
        this.engine = engine
        this.workspaces = []
        this.currentWorkspace = null
        this.activeWorkspace = null
        this.makeObservable()
    }

    makeObservable() {
        define(this, {
            currentWorkspace: observable.ref,
            workspaces: observable.shallow,
            activeWorkspace: observable.ref,
            type: observable.ref,
            switchWorkspace: action,
            addWorkspace: action,
            removeWorkspace: action,
            setActiveWorkspace: action,
            setWorkbenchType: action,
        })
    }

    switchWorkspace(id: string) {
        const finded = this.findWorkspaceById(id)
        if (finded) {
            this.currentWorkspace = finded
            this.engine.dispatch(new SwitchWorkspaceEvent(finded))
        }
        return this.currentWorkspace
    }

    setActiveWorkspace(workspace: Workspace) {
        this.activeWorkspace = workspace
        return workspace
    }

    setWorkbenchType(type: WorkbenchTypes) {
        this.type = type
    }

    addWorkspace(props: IWorkspaceProps) {
        const finded = this.findWorkspaceById(props.id)
        if (!finded) {
            this.currentWorkspace = new Workspace(this.engine, props)
            this.workspaces.push(this.currentWorkspace)
            this.engine.dispatch(new AddWorkspaceEvent(this.currentWorkspace))
            return this.currentWorkspace
        }
        return finded
    }

    removeWorkspace(id: string) {
        // const findIndex = this.findWorkspaceIndexById(id)
        // if (findIndex > -1 && findIndex < this.workspaces.length) {
        //     const findedWorkspace = this.workspaces[findIndex]
        //     findedWorkspace.viewport.detachEvents()
        //     this.workspaces.splice(findIndex, 1)
        //     if (findedWorkspace === this.currentWorkspace) {
        //         if (this.workspaces.length && this.workspaces[findIndex]) {
        //             this.currentWorkspace = this.workspaces[findIndex]
        //         } else {
        //             this.currentWorkspace = this.workspaces[this.workspaces.length - 1]
        //         }
        //     }
        //     this.engine.dispatch(new RemoveWorkspaceEvent(findedWorkspace))
        // }
    }

    ensureWorkspace(props: IWorkspaceProps = {}) {
        const workspace = this.findWorkspaceById(props.id)
        if (workspace) return workspace
        this.addWorkspace(props)
        return this.currentWorkspace
    }

    findWorkspaceById(id: string) {
        return this.workspaces.find((item) => item.id === id)
    }

    findWorkspaceIndexById(id: string) {
        return this.workspaces.findIndex((item) => item.id === id)
    }

    mapWorkspace<T>(callbackFn: (value: Workspace, index: number) => T): T[] {
        return this.workspaces.map(callbackFn)
    }

    eachWorkspace<T>(callbackFn: (value: Workspace, index: number) => T) {
        this.workspaces.forEach(callbackFn)
    }

}