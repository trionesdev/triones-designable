import {GlobalToken} from "antd";
import {CSSInterpolation} from "@ant-design/cssinjs";

export const genFlowDesignerStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => [
    {
        [`.${prefixCls}`]: {
            height: '100%',
        }
    }
]

export const genFlowViewportStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => [
    {
        [`.${prefixCls}`]: {
            flex: '1 auto',
            display: 'flex',
            backgroundColor: 'white',
            width: 0,
            [`.x6-graph`]: {
                width: '100%!important',
                height: '100%!important'
            }
        }
    }
]