import React, {useState} from 'react'
import {useField, observer} from '@formily/react'
import {usePrefix, IconWidget, useCssInJs} from '@alkaid/react'
import cls from 'classnames'
import {genCollapseItemStyle} from "./styles";

// import './styles.less'

export interface ICollapseItemProps {
    className?: string
    style?: React.CSSProperties
    defaultExpand?: boolean
}

export const CollapseItem: React.FC<ICollapseItemProps> = observer((props) => {
    const prefix = usePrefix('collapse-item')
    const {hashId, wrapSSR} = useCssInJs({prefix, styleFun: genCollapseItemStyle})
    const field = useField()
    const [expand, setExpand] = useState(props.defaultExpand ?? true)
    return wrapSSR(
        <div
            className={cls(prefix, props.className, {expand}, hashId)}
            style={props.style}
        >
            <div
                className={cls(prefix + '-header', hashId)}
                onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setExpand(!expand)
                }}
            >
                <div className={cls(prefix + '-header-expand', hashId)}>
                    <IconWidget infer="Expand" size={10}/>
                </div>
                <div className={cls(prefix + '-header-content', hashId)}>{field.title}</div>
            </div>
            <div className={cls(prefix + '-content', hashId)}>{props.children}</div>
        </div>
    )
})
