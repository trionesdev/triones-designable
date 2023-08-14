import {useContext} from "react";
import {GraphDesignerEngineContext} from "../context";

export const useGraphDesigner = () => {
  return useContext(GraphDesignerEngineContext)
}