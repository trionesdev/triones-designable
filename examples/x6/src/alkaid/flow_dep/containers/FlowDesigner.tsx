import {Designer, IDesignerLayoutProps} from "@alkaid/react";
import React, {FC} from "react";
import {GraphDesignerEngineContext, GraphEngine} from "../context";

interface IFlowDesignerProps extends IDesignerLayoutProps {
    children?: React.ReactNode
    engine: GraphEngine,
}

export const FlowDesigner: FC<IFlowDesignerProps> = ({...props}) => {
    return <GraphDesignerEngineContext.Provider value={props.engine}>
        <Designer {...props}>{props.children}</Designer>
    </GraphDesignerEngineContext.Provider>
}