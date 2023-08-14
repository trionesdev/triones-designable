import React, {FC, useEffect, useRef} from "react";
import {FlowEngine} from "../models";
import {FlowDesignerEngineContext} from "../context";
import {useFlowDesigner} from "../hooks";

type FlowDesignerProps = {
    children?: React.ReactNode
    engine: FlowEngine
}
export const FlowDesigner: FC<FlowDesignerProps> = (props) => {
    const engine = useFlowDesigner()
    const ref = useRef<FlowEngine>()
    useEffect(() => {
        if (props.engine) {
            if (props.engine && ref.current) {
                if (props.engine !== ref.current) {
                    ref.current.unmount()
                }
            }
            props.engine.mount()
            ref.current = props.engine
        }
        return () => {
            if (props.engine) {
                props.engine.unmount()
            }
        }
    }, [props.engine])

    if (engine)
        throw new Error(
            'There can only be one Designable Engine Context in the React Tree'
        )
    return <div>
        <FlowDesignerEngineContext.Provider value={engine}>
            {props.children}
        </FlowDesignerEngineContext.Provider>
    </div>
}