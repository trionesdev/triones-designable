import React, {FC, useEffect, useRef} from "react";
import {FlowEngine} from "../models";
import {FlowDesignerEngineContext} from "../context";
import {useFlowDesigner} from "../hooks";
import {useCssInJs} from "@alkaid/react";
import {genFlowDesignerStyle} from "./styles";
import cls from "classnames";

type FlowDesignerProps = {
    children?: React.ReactNode
    engine: FlowEngine,
    className?: string,
    style?: React.CSSProperties
}
export const FlowDesigner: FC<FlowDesignerProps> = (props) => {
    const engine = useFlowDesigner()
    const ref = useRef<FlowEngine>()
    const prefix = "af-designer"
    const {hashId, wrapSSR} = useCssInJs({prefix, styleFun: genFlowDesignerStyle})

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
    return wrapSSR(<div className={cls(prefix, props.className, hashId)} style={props.style}>
        <FlowDesignerEngineContext.Provider value={props.engine}>
            {props.children}
        </FlowDesignerEngineContext.Provider>
    </div>)
}