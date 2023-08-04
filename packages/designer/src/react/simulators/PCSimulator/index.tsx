import React from 'react'
import cls from 'classnames'
import './styles.less'
import {GlobalToken, theme} from "antd";
import {CSSInterpolation, useStyleRegister} from "@ant-design/cssinjs";

const {useToken} = theme;
const genPCSimulatorStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => {
    return {
        [`.${prefixCls}`]: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            boxSizing: 'border-box'
        }
    };
};

export interface IPCSimulatorProps
    extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
    style?: React.CSSProperties
}

export const PCSimulator: React.FC<IPCSimulatorProps> = (props) => {

    const prefixCls = 'alkaid-designer-pc-simulator';
    const {theme, token, hashId} = useToken();
    const wrapSSR = useStyleRegister(
        {theme, token, hashId, path: [prefixCls]},
        () => [genPCSimulatorStyle(prefixCls, token)],
    );

    return wrapSSR(
        <div {...props} className={cls(prefixCls, hashId)}>
            {props.children}
        </div>
    )
}
