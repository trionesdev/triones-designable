import {CSSInterpolation, useStyleRegister} from "@ant-design/cssinjs";
import {theme} from "antd";

const {useToken} = theme;

type CssInJsProps = {
    prefix?: string,
    styleFun?: (prefix: string, token?: any) => CSSInterpolation
}
export const useCssInJs = (params?: CssInJsProps) => {
    const {theme, token, hashId} = useToken();
    const wrapSSR = params?.styleFun ? useStyleRegister(
        {theme, token, hashId, path: [params.prefix]},
        () => [params?.styleFun?.(params?.prefix, token)],
    ) : null;
    return {hashId, wrapSSR}
}