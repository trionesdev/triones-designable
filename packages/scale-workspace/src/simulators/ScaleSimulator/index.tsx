import React, { useEffect, useRef } from "react";
import { observer } from "@formily/reactive-react";
import { useScreen, usePrefix, useCssInJs } from "@alkaid/react";
import { useSize, useWindowScale } from "../../hooks";
import cls from "classnames";
// import './styles.less'
import { genResponsiveSimulatorStyle } from "./styles";

export interface IScaleSimulatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
}

export const ScaleSimulator: React.FC<IScaleSimulatorProps> = observer(
  (props) => {
    const container = useRef<HTMLDivElement>();
    const content = useRef<HTMLDivElement>();
    const prefix = usePrefix("responsive-simulator");
    const containerSize = useSize(container);
    const { hashId, wrapSSR } = useCssInJs({
      prefix,
      styleFun: genResponsiveSimulatorStyle,
    });
    const screen = useScreen();
    const myScale = useWindowScale({
      designWidth: Number(screen.width),
      designHeight: Number(screen.height),
      width: containerSize.width,
      height: containerSize.height,
    });
    useEffect(() => {
      screen.setScale(myScale.scale);
    }, [containerSize, myScale]);
    useEffect(() => {
      const rect = content.current?.getBoundingClientRect();
      screen.setContentRect(rect);
    }, [screen.scale, screen.width, screen.height]);

    return wrapSSR(
      <div
        {...props}
        className={cls(prefix, props.className, hashId)}
        style={{
          height: "100%",
          width: "100%",
          minHeight: 100,
          position: "relative",
          ...props.style,
        }}
      >
        <div
          ref={container}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            overflow: "overlay",
          }}
        >
          <div
            ref={content}
            style={{
              width: screen.width,
              height: screen.height,
              boxSizing: "border-box",
              overflow: "hidden",
              transformOrigin: "left top",
              transform: `scale(${screen.scale}) translate(-50%, -50%)`,
              backgroundColor: "aliceblue", //方便调试使用背景颜色
              // transition: "transform .3s ease-in-out",
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          >
            {props.children}
          </div>
        </div>
      </div>
    );
  }
);
