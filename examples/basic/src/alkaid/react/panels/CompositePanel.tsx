import React, {useEffect, useRef, useState} from 'react'
import {isValid} from '@alkaid/shared'
import cls from 'classnames'
import {IconWidget, TextWidget} from '../widgets'
import {useCssInJs, usePrefix} from '../hooks'
import {genCompositePanelStyle} from "./styles";

export interface ICompositePanelProps {
    children?: React.ReactNode
    direction?: 'left' | 'right'
    showNavTitle?: boolean
    defaultOpen?: boolean
    defaultPinning?: boolean
    defaultActiveKey?: number
    activeKey?: number | string
    onChange?: (activeKey: number | string) => void
}

export interface ICompositePanelItemProps {
    children?: React.ReactNode
    shape?: 'tab' | 'button' | 'link'
    title?: React.ReactNode
    icon?: React.ReactNode
    key?: number | string
    href?: string
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    extra?: React.ReactNode
}

const parseItems = (
    children: React.ReactNode
): React.PropsWithChildren<ICompositePanelItemProps>[] => {
    const items = []
    React.Children.forEach(children, (child, index) => {
        if (child?.['type'] === CompositePanel.Item) {
            items.push({key: child['key'] ?? index, ...child['props']})
        }
    })
    return items
}

const findItem = (
    items: React.PropsWithChildren<ICompositePanelItemProps>[],
    key: string | number
) => {
    for (let index = 0; index < items.length; index++) {
        const item = items[index]
        if (key === index) return item
        if (key === item.key) return item
    }
}

const getDefaultKey = (children: React.ReactNode) => {
    const items = parseItems(children)
    return items?.[0].key
}

export const CompositePanel: React.FC<ICompositePanelProps> & {
    Item: React.FC<ICompositePanelItemProps>
} = (props) => {
    const prefix = usePrefix('composite-panel')
    const [activeKey, setActiveKey] = useState<string | number>(
        props.defaultActiveKey ?? getDefaultKey(props.children)
    )
    const activeKeyRef = useRef(null)
    const [pinning, setPinning] = useState(props.defaultPinning ?? false)
    const [visible, setVisible] = useState(props.defaultOpen ?? true)
    const items = parseItems(props.children)
    const currentItem = findItem(items, activeKey)
    const content = currentItem?.children

    activeKeyRef.current = activeKey

    useEffect(() => {
        if (isValid(props.activeKey)) {
            if (props.activeKey !== activeKeyRef.current) {
                setActiveKey(props.activeKey)
            }
        }
    }, [props.activeKey])

    const {hashId, wrapSSR} = useCssInJs({prefix, styleFun: genCompositePanelStyle})

    const renderContent = () => {
        if (!content || !visible) return
        return (
            <div
                className={cls(prefix + '-tabs-content', {
                    pinning,
                }, hashId)}
            >
                <div className={cls(prefix + '-tabs-header', hashId)}>
                    <div className={cls(prefix + '-tabs-header-title', hashId)}>
                        <TextWidget>{currentItem.title}</TextWidget>
                    </div>
                    <div className={cls(prefix + '-tabs-header-actions', hashId)}>
                        <div className={cls(prefix + '-tabs-header-extra', hashId)}>
                            {currentItem.extra}
                        </div>
                        {!pinning && (
                            <IconWidget
                                infer="PushPinOutlined"
                                className={cls(prefix + '-tabs-header-pin', hashId)}
                                onClick={() => {
                                    setPinning(!pinning)
                                }}
                            />
                        )}
                        {pinning && (
                            <IconWidget
                                infer="PushPinFilled"
                                className={cls(prefix + '-tabs-header-pin-filled', hashId)}
                                onClick={() => {
                                    setPinning(!pinning)
                                }}
                            />
                        )}
                        <IconWidget
                            infer="Close"
                            className={cls(prefix + '-tabs-header-close', hashId)}
                            onClick={() => {
                                setVisible(false)
                            }}
                        />
                    </div>
                </div>
                <div className={cls(prefix + '-tabs-body', hashId)}>{content}</div>
            </div>
        )
    }

    return wrapSSR(
        <div
            className={cls(prefix, {
                [`direction-${props.direction}`]: !!props.direction,
            }, hashId)}
        >
            <div className={cls(prefix + '-tabs', hashId)}>
                {items.map((item, index) => {
                    const takeTab = () => {
                        if (item.href) {
                            return <a href={item.href}>{item.icon}</a>
                        }
                        return (
                            <IconWidget
                                tooltip={
                                    props.showNavTitle
                                        ? null
                                        : {
                                            title: <TextWidget>{item.title}</TextWidget>,
                                            placement:
                                                props.direction === 'right' ? 'left' : 'right',
                                        }
                                }
                                infer={item.icon}
                            />
                        )
                    }
                    const shape = item.shape ?? 'tab'
                    const Comp = shape === 'link' ? 'a' : 'div'
                    return (
                        <Comp
                            className={cls(prefix + '-tabs-pane', {
                                active: activeKey === item.key,
                            }, hashId)}
                            key={index}
                            href={item.href}
                            onClick={(e: any) => {
                                if (shape === 'tab') {
                                    if (activeKey === item.key) {
                                        setVisible(!visible)
                                    } else {
                                        setVisible(true)
                                    }
                                    if (!props?.activeKey || !props?.onChange)
                                        setActiveKey(item.key)
                                }
                                item.onClick?.(e)
                                props.onChange?.(item.key)
                            }}
                        >
                            {takeTab()}
                            {props.showNavTitle && item.title ? (
                                <div className={cls(prefix + '-tabs-pane-title', hashId)}>
                                    <TextWidget>{item.title}</TextWidget>
                                </div>
                            ) : null}
                        </Comp>
                    )
                })}
            </div>
            {renderContent()}
        </div>
    )
}

CompositePanel.Item = () => {
    return <React.Fragment/>
}
