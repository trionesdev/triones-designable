import React, {useContext} from 'react'
import {usePrefix, IconWidget, useCssInJs} from '@trionesdev/designable-react'
import cls from 'classnames'
import {genInputItemsItemStyle, genInputItemsStyle} from "./styles";

// import './styles.less'

export interface IInputItemsContext {
    width?: string | number
    vertical?: boolean
}

export interface IInputItemsProps {
    children?: React.ReactNode
    className?: string
    style?: React.CSSProperties
    width?: string | number
    vertical?: boolean
}

export interface IInputItemProps {
    children?: React.ReactNode
    className?: string
    style?: React.CSSProperties
    icon?: React.ReactNode
    width?: string | number
    vertical?: boolean
    title?: React.ReactNode
}

const InputItemsContext = React.createContext<IInputItemsContext>(null)

export const InputItems: React.FC<IInputItemsProps> & {
    Item: React.FC<IInputItemProps>
} = (props) => {
    const prefix = usePrefix('input-items')
    const {hashId} = useCssInJs({prefix, styleFun: genInputItemsStyle})
    return (
        <InputItemsContext.Provider value={props}>
            <div className={cls(prefix, props.className, hashId)} style={props.style}>
                {props.children}
            </div>
        </InputItemsContext.Provider>
    )
}

InputItems.defaultProps = {
    width: '100%',
}

InputItems.Item = (props) => {
    const prefix = usePrefix('input-items-item')
    const ctx = useContext(InputItemsContext)
    const {hashId, wrapSSR} = useCssInJs({prefix, styleFun: genInputItemsItemStyle})
    return wrapSSR(
        <div
            className={cls(prefix, props.className, {
                vertical: props.vertical || ctx.vertical,
            }, hashId)}
            style={{width: props.width || ctx.width, ...props.style}}
        >
            {props.icon && (
                <div className={cls(prefix + '-icon', hashId)}>
                    <IconWidget infer={props.icon} size={16}/>
                </div>
            )}
            {props.title && <div className={cls(prefix + '-title', hashId)}>{props.title}</div>}
            <div className={cls(prefix + '-controller', hashId)}>{props.children}</div>
        </div>
    )
}
