import {createContext} from "react";
import {Engine, IDesignerComponents, TreeNode} from "../core";

export const DesignerEngineContext = createContext<Engine | null>(null)

export const DesignerComponentsContext = createContext<IDesignerComponents>({})
export const TreeNodeContext = createContext<TreeNode | null>(null)

export interface IWorkspace {
    id: string
    title?: string
    description?: string
}

export const WorkspaceContext = createContext<IWorkspace | null | undefined>(null)