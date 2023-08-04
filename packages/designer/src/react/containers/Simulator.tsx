import {observer} from "@formily/react";
import {useScreen} from "../hooks";
import {ScreenType} from "../../core";
import {PCSimulator} from "../simulators";
import {requestIdle} from "../../shared";
import React from "react";

export type ISimulatorProps = React.HTMLAttributes<HTMLDivElement>

export const Simulator: React.FC<ISimulatorProps> = observer(
    (props: ISimulatorProps) => {
        const screen = useScreen()
        if (screen.type === ScreenType.PC)
            return <PCSimulator {...props}>{props.children}</PCSimulator>
        return <PCSimulator {...props}>{props.children}</PCSimulator>
    },
    {
        scheduler: requestIdle,
    }
)