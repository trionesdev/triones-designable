import React, {FC} from "react";

type WorkspacePanelProps = {
    children?: React.ReactNode
}
export const WorkspacePanel: FC<WorkspacePanelProps> = ({
                                                            children
                                                        }) => {
    return <div>{children}</div>
}