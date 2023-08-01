import {useContext} from "react";
import {DesignerEngineContext} from "../context";

export const useDesigner = () => {
    const designer = useContext(DesignerEngineContext)
    return designer
}