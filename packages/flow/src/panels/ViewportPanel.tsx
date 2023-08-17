import {useCssInJs} from "@alkaid/react";
import {genViewportPanelStyle} from "./styles";
import React, {FC} from "react";
import cls from "classnames";
import {FlowViewport} from "../containers";

type ViewportPanelProps = {
    children?: () => React.ReactElement
}
export const ViewportPanel: FC<ViewportPanelProps> = ({children}) => {
    const prefix = "alkaid-flow-viewport-panel"
    const {hashId, wrapSSR} = useCssInJs({prefix, styleFun: genViewportPanelStyle})

    const handleRender = () => {
        return children()
    }

    return wrapSSR(<div className={cls(prefix, hashId)}>
        <FlowViewport/>  {handleRender()}
    </div>)
}