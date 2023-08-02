import React, {FC} from "react";

type ViewPanelPros = {
    children?: React.ReactNode
}
export const ViewPanel: FC<ViewPanelPros> = ({
                                                 children
                                             }) => {
    return <div>{children}</div>
}