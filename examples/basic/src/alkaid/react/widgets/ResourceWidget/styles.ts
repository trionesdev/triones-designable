import {GlobalToken} from "antd";
import {CSSInterpolation} from "@ant-design/cssinjs";

export const genResourceWidgetStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => [
    {
        [`.${prefixCls}`]: {
            minHeight: '100%',
            minWidth: '100%'
        }
    }
]