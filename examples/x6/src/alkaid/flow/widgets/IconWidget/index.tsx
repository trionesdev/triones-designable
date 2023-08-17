import React, {createContext, useContext} from 'react'
import {isStr, isFn, isObj} from '@alkaid/shared'
import {observer} from '@formily/reactive-react'
import {Tooltip, TooltipProps} from 'antd'
import cls from 'classnames'
import {genIconWidgetStyle} from "./styles";
import {useCssInJs} from "@alkaid/react";
import {GlobalRegistry} from "@alkaid/core";

const IconContext = createContext<IconProviderProps>(null)

// const isNumSize = (val: any) => /^[\d.]+$/.test(val)

export interface IconProviderProps {
    children?: React.ReactNode
    tooltip?: boolean
}

export interface IShadowSVGProps {
    content?: string
    width?: number | string
    height?: number | string
}

export interface IIconWidgetProps extends React.HTMLAttributes<HTMLElement> {
    tooltip?: React.ReactNode | TooltipProps
    infer: React.ReactNode
    size?: number | string
}

export const IconWidget: React.FC<IIconWidgetProps> & {
    Provider?: React.FC<IconProviderProps>
    ShadowSVG?: React.FC<IShadowSVGProps>
} = observer((props: React.PropsWithChildren<IIconWidgetProps>) => {
    const context = useContext(IconContext)
    const registry = GlobalRegistry
    const prefix = 'af-icon'
    const {hashId, wrapSSR} = useCssInJs({prefix, styleFun: genIconWidgetStyle})
    const size = props.size || '1em'
    const height = props.style?.height || size
    const width = props.style?.width || size
    const takeIcon = (infer: React.ReactNode) => {
        if (isStr(infer)) {
            const finded = registry.getDesignerIcon(infer)
            if (finded) {
                return takeIcon(finded)
            }
            return <img src={infer} height={height} width={width}/>
        } else if (isFn(infer)) {
            return React.createElement(infer, {
                height,
                width,
                fill: 'currentColor',
            })
        } else if (React.isValidElement(infer)) {
            if (infer.type === 'svg') {
                const inferProps = Object.assign({}, {
                    "height": height,
                    width,
                    fill: 'currentColor',
                    viewBox: infer.props.viewBox || '0 0 1024 1024',
                    focusable: 'false',
                    'aria-hidden': 'true',
                })
                return React.cloneElement(infer, inferProps)
            } else if (infer.type === 'path' || infer.type === 'g') {
                return (
                    <svg
                        viewBox="0 0 1024 1024"
                        height={height}
                        width={width}
                        fill="currentColor"
                        focusable="false"
                        aria-hidden="true"
                    >
                        {infer}
                    </svg>
                )
            }
            return infer
        }
    }
    const renderTooltips = (children: React.ReactElement): React.ReactElement => {
        if (!isStr(props.infer) && context?.tooltip) return children as any
        const tooltip =
            props.tooltip || registry.getDesignerMessage(`icons.${props.infer}`)
        if (tooltip) {
            const title =
                React.isValidElement(tooltip) || isStr(tooltip)
                    ? tooltip
                    : tooltip.title
            const props =
                React.isValidElement(tooltip) || isStr(tooltip)
                    ? {}
                    : isObj(tooltip)
                        ? tooltip
                        : {}
            return (
                <Tooltip {...props} title={title}>
                    {children}
                </Tooltip>
            )
        }
        return children
    }
    if (!props.infer) return null
    return wrapSSR(renderTooltips(
        <span
            {...props}
            className={cls(prefix, props.className, hashId)}
            style={{
                ...props.style,
                cursor: props.onClick ? 'pointer' : props.style?.cursor,
            }}
        >
      {takeIcon(props.infer)}
    </span>
    ))
})


IconWidget.Provider = (props) => {
    return (
        <IconContext.Provider value={props}>{props.children}</IconContext.Provider>
    )
}
