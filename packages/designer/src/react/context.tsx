import {createContext} from "react";
import {Engine, IDesignerComponents, TreeNode} from "../core";
import {IOperation} from "../core/models/Operation";

export const DesignerEngineContext = createContext<Engine | null | undefined>(null)

export const DesignerComponentsContext = createContext<IDesignerComponents>({})
export const TreeNodeContext = createContext<TreeNode | null>(null)

export interface IWorkspace {
    id: string
    title?: string
    description?: string
    operation?: IOperation
}

export const WorkspaceContext = createContext<IWorkspace | null | undefined>(null)