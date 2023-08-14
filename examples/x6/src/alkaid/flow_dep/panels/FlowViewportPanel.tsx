import React from "react";
import {IWorkspaceItemProps, WorkspacePanel} from "@alkaid/react";

export const FlowViewportPanel: React.FC<IWorkspaceItemProps> = (props) => {
    return (<WorkspacePanel.Item {...props} flexable>
        {props.children}
    </WorkspacePanel.Item>)
}