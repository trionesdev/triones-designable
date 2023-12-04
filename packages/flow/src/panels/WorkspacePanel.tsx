import React, {FC} from "react";
import {useCssInJs} from "@trionesdev/designable-react";
import {genWorkspacePanelStyle} from "./styles";
import cls from "classnames";

type WorkspacePanelProps = {
    children?: React.ReactNode
}
export const WorkspacePanel: FC<WorkspacePanelProps> = ({
                                                            children
                                                        }) => {
    const prefix = "alkaid-flow-workspace-panel"
    const {hashId, wrapSSR} = useCssInJs({prefix, styleFun: genWorkspacePanelStyle})
    return wrapSSR(<div className={cls(prefix, hashId)}>{children}</div>)
}