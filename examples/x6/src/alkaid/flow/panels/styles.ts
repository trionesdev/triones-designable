import {GlobalToken} from "antd";
import {CSSInterpolation} from "@ant-design/cssinjs";

export const genResourcePanelStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => [
    {
        [`.${prefixCls}`]: {
            width: '300px'
        }
    }
]