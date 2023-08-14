import {useContext} from "react";
import {DesignerEngineContext} from "@alkaid/react";
import {globalThisPolyfill} from "@alkaid/shared";

export const useFlowDesigner = () => {
    const context = useContext(DesignerEngineContext)
    return globalThisPolyfill['__ALKAID_FLOW_ENGINE__'] || context
}