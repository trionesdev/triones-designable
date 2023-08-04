import {useLayoutEffect, useRef, useState} from "react";
import {useViewport} from "../hooks";
import { Viewport as ViewportType } from '../../core'
import {globalThisPolyfill, requestIdle} from "../../shared";
import React from "react";
import {AuxToolWidget} from "../widgets/AuxToolWidget";
import {GlobalToken, theme} from "antd";
import {CSSInterpolation, useStyleRegister} from "@ant-design/cssinjs";
import classNames from "classnames";

const {useToken} = theme;
const genViewportStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => {
    return {
        [`.${prefixCls}`]: {
            height: '100%'
        }
    };
};

export interface IViewportProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'placeholder'> {
    placeholder?: React.ReactNode
    dragTipsDirection?: 'left' | 'right'
}

export const Viewport: React.FC<IViewportProps> = ({
                                                       placeholder,
                                                       dragTipsDirection,
                                                       ...props
                                                   }) =>{
    const [loaded, setLoaded] = useState(false)
    const viewport = useViewport()
    const ref = useRef<HTMLDivElement>()
    const viewportRef = useRef<ViewportType>()
    const isFrameRef = useRef(false)
    useLayoutEffect(() => {
        const frameElement = ref.current.querySelector('iframe')
        if (!viewport) return
        if (viewportRef.current && viewportRef.current !== viewport) {
            viewportRef.current.onUnmount()
        }
        if (frameElement) {
            frameElement.addEventListener('load', () => {
                viewport.onMount(frameElement, frameElement.contentWindow)
                requestIdle(() => {
                    isFrameRef.current = true
                    setLoaded(true)
                })
            })
        } else {
            viewport.onMount(ref.current, globalThisPolyfill)
            requestIdle(() => {
                isFrameRef.current = false
                setLoaded(true)
            })
        }
        viewportRef.current = viewport
        return () => {
            viewport.onUnmount()
        }
    }, [viewport])

    const prefixCls = 'alkaid-designer-viewport';
    const {theme, token, hashId} = useToken();
    const wrapSSR = useStyleRegister(
        {theme, token, hashId, path: [prefixCls]},
        () => [genViewportStyle(prefixCls, token)],
    );

    return wrapSSR(<div
        {...props}
        ref={ref}
        className={classNames(prefixCls,hashId)}
        style={{
            opacity: !loaded ? 0 : 1,
            overflow: isFrameRef.current ? 'hidden' : 'overlay',
            ...props.style,
        }}
    >
        {props.children}
        <AuxToolWidget />
    </div>)
}