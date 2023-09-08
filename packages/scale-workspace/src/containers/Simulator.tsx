import React from "react";
import { ScreenType } from "@alkaid/core";
import { requestIdle } from "@alkaid/shared";
import { observer } from "@formily/reactive-react";
import { useScreen } from "@alkaid/react";
import { ScaleSimulator, PCSimulator } from "../simulators";

export type ISimulatorProps = React.HTMLAttributes<HTMLDivElement>;

export const Simulator: React.FC<ISimulatorProps> = observer(
  (props: ISimulatorProps) => {
    const screen = useScreen();

    if (screen.type === ScreenType.Scale)
      return <ScaleSimulator {...props}>{props.children}</ScaleSimulator>;
    return <PCSimulator {...props}>{props.children}</PCSimulator>;
  },
  {
    scheduler: requestIdle,
  }
);
