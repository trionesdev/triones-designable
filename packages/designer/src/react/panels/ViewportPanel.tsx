import React, {FC} from "react";

type ViewportPanelProps = {
    children?: React.ReactNode
}
export const ViewportPanel: FC<ViewportPanelProps> = ({
                                                          children
                                                      }) => {
    return <div>{children}</div>
}