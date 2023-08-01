import {useContext} from "react";
import {DesignerEngineContext} from "../context";

export const useDesigner = () => {
    const designer: Engine = useContext(DesignerEngineContext)
    return designer
}