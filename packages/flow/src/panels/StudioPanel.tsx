import {useCssInJs} from "@alkaid/react";
import {genStudioPanelStyle} from "./styles";
import cls from "classnames";
import React, {FC} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend'
import {Space} from "antd";

type StudioPanelProps = {
    children?: React.ReactNode
    position?: 'fixed' | 'reactive'
    actions?: React.ReactNode
}
export const StudioPanel: FC<StudioPanelProps> = ({
                                                      children,
                                                      position = "fixed",
                                                      actions
                                                  }) => {
    const prefix = "alkaid-flow-studio-panel"
    const {hashId, wrapSSR} = useCssInJs({prefix, styleFun: genStudioPanelStyle})
    return wrapSSR(<div className={cls(prefix, position, hashId)}>
        {actions && <div className={cls(`${prefix}-header`, hashId)}>
            <div></div>
            <Space>{actions}</Space>
        </div>}
        <div className={cls(`${prefix}-body`, hashId)}>
            <DndProvider backend={HTML5Backend}>
                {children}
            </DndProvider>
        </div>
    </div>)
}