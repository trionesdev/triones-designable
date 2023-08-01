import {createContext} from "react";
import {Engine, IDesignerComponents} from "../core";

export const DesignerEngineContext = createContext<Engine | null>(null)

export const DesignerComponentsContext = createContext<IDesignerComponents>({})