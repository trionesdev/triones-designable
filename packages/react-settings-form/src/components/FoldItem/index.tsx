import React, {Fragment, useRef, useMemo} from 'react'
import {FormItem, IFormItemProps} from '@formily/antd-v5'
import {useField, observer} from '@formily/react'
import {observable} from '@formily/reactive'
import {IconWidget, useCssInJs, usePrefix} from '@alkaid/react'
import cls from 'classnames'
import {genFoldItemStyle} from "./styles";

const ExpandedMap = new Map<string, boolean>()

export const FoldItem: React.FC<IFormItemProps & { children: React.ReactNode }> & {
    Base?: React.FC<{ children: React.ReactNode }>
    Extra?: React.FC<{ children: React.ReactNode }>
} = observer(({className, style, children, ...props}) => {
    const prefix = usePrefix('fold-item')
    const field = useField()
    const expand = useMemo(
        () => observable.ref(ExpandedMap.get(field.address.toString())),
        []
    )
    const slots = useRef({base: null, extra: null})
    React.Children.forEach(children, (node) => {
        if (React.isValidElement(node)) {
            if (node?.['type']?.['displayName'] === 'FoldItem.Base') {
                slots.current.base = node['props'].children
            }
            if (node?.['type']?.['displayName'] === 'FoldItem.Extra') {
                slots.current.extra = node['props'].children
            }
        }
    })

    const {hashId,wrapSSR} = useCssInJs({prefix, styleFun: genFoldItemStyle})

    return wrapSSR(
        <div className={cls(prefix, className,hashId)}>
            <div
                className={cls(prefix + '-base',hashId)}
                onClick={() => {
                    expand.value = !expand.value
                    ExpandedMap.set(field.address.toString(), expand.value)
                }}
            >
                <FormItem.BaseItem
                    {...props}
                    label={
                        <span
                            className={cls(prefix + '-title', {
                                expand: expand.value,
                            },hashId)}
                        >
              {slots.current.extra && <IconWidget infer="Expand" size={10}/>}
                            {props.label}
            </span>
                    }
                >
                    <div
                        style={{width: '100%'}}
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                    >
                        {slots.current.base}
                    </div>
                </FormItem.BaseItem>
            </div>
            {expand.value && slots.current.extra && (
                <div className={cls(prefix + '-extra',hashId)}>{slots.current.extra}</div>
            )}
        </div>
    )
})

const Base: React.FC<{ children: React.ReactNode }> = () => {
    return <Fragment/>
}

Base.displayName = 'FoldItem.Base'

const Extra: React.FC<{ children: React.ReactNode }> = () => {
    return <Fragment/>
}

Extra.displayName = 'FoldItem.Extra'

FoldItem.Base = Base
FoldItem.Extra = Extra
