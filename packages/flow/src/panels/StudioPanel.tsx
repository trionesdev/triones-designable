import {useCssInJs} from "@trionesdev/designable-react";
import {genStudioPanelStyle} from "./styles";
import cls from "classnames";
import React, {FC} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend'

type StudioPanelProps = {
    children?: React.ReactNode
    position?: 'fixed' | 'reactive'
}
export const StudioPanel: FC<StudioPanelProps> = ({
                                                      children,
                                                      position = "fixed"
                                                  }) => {
    const prefix = "alkaid-flow-studio-panel"
    const {hashId, wrapSSR} = useCssInJs({prefix, styleFun: genStudioPanelStyle})
    return wrapSSR(<div className={cls(prefix, position, hashId)}>
        <DndProvider backend={HTML5Backend}>
            {children}
        </DndProvider>
    </div>)
}