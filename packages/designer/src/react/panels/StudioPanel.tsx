import React, {FC} from "react"

type StudioPanelProps = {
    children?: React.ReactNode
}
export const StudioPanel: FC<StudioPanelProps> = ({...props}) => {
    return <div>{props.children}</div>
}