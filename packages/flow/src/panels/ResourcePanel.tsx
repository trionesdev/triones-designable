import React from "react";
import {useCssInJs} from "@trionesdev/designable-react";
import {genResourcePanelStyle} from "./styles";
import cls from "classnames";

type ResourcePanelProps = {
    children?: React.ReactNode
}
export const ResourcePanel: React.FC<ResourcePanelProps> = (props) => {
    const prefix = "resource-panel"
    const {hashId, wrapSSR} = useCssInJs({prefix, styleFun: genResourcePanelStyle})
    return wrapSSR(<div className={cls(prefix, hashId)}>{props.children}</div>)
}