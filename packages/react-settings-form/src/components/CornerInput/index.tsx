import React, {useState, useEffect} from 'react'
import {useCssInJs, usePrefix} from '@alkaid/react'
import cls from 'classnames'
import {genCornerInputStyle} from "./styles";

// import './styles.less'

export interface ICornerInputProps {
    className?: string
    style?: React.CSSProperties
    value?: string
    onChange?: (value: string) => void
}

export const CornerInput: React.FC<ICornerInputProps> = (props) => {
    const prefix = usePrefix('corner-input')
    const {hashId, wrapSSR} = useCssInJs({prefix, styleFun: genCornerInputStyle})
    const [current, setCurrent] = useState(props.value)
    useEffect(() => {
        if (!props.value) {
            setCurrent('all')
        }
    }, [props.value])
    const createCellProps = (type: string) => ({
        className: cls(prefix + '-cell', {active: current === type}),
        onClick() {
            setCurrent(type)
            props.onChange?.(type)
        },
    })
    return wrapSSR(
        <div className={cls(prefix, props.className, hashId)} style={props.style}>
            <div className={cls(prefix + '-column', hashId)}>
                <div {...createCellProps('topLeft')}>┏</div>
                <div {...createCellProps('bottomLeft')}>┗</div>
            </div>
            <div className={cls(prefix + '-column', hashId)}>
                <div {...createCellProps('all')}>╋</div>
            </div>
            <div className={cls(prefix + '-column', hashId)}>
                <div {...createCellProps('topRight')}>┓</div>
                <div {...createCellProps('bottomRight')}>┛</div>
            </div>
        </div>
    )
}
