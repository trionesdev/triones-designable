import {useContext, useEffect} from "react";
import {DesignerEngineContext} from "../context";
import {Engine} from "../../core";
import {globalThisPolyfill, isFn} from "../../shared";

export interface IEffects {
    (engine: Engine): void
}

export const useDesigner = (effects?: IEffects) => {
    const designer: Engine =
        globalThisPolyfill['__DESIGNABLE_ENGINE__'] ||
        useContext(DesignerEngineContext)
    useEffect(() => {
        if (isFn(effects)) {
            return effects(designer)
        }
    }, [])
    return designer
}