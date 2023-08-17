import {GlobalToken} from "antd";
import {CSSInterpolation} from "@ant-design/cssinjs";

export const genFlowViewportStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => [
    {
        [`.${prefixCls}`]: {
            flex: '1 auto',
            display: 'flex',
            backgroundColor: 'white',
            width: 0
        }
    }
]