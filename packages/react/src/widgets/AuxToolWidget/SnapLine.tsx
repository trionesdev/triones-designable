import React from 'react'
import {useTransformHelper, useCursor, usePrefix, useToken} from '../../hooks'
import {observer} from '@formily/reactive-react'
import {CursorStatus} from '@trionesdev/designable-core'
import {Rect} from "@trionesdev/designable-shared";
import cls from "classnames";

export const SnapLine:React.FC = observer(() => {
    const cursor = useCursor()
    const transformHelper = useTransformHelper()
    const prefix = usePrefix('aux-snap-line')
    const {hashId} = useToken()
    const createLineStyle = (rect: Rect) => {
        const baseStyle: React.CSSProperties = {
            top: 0,
            left: 0,
            height: rect.height || 1,
            width: rect.width || 1,
            transform: `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`,
            background: `#b0b1f3`,
            position: 'absolute',
            zIndex: 2,
        }
        return baseStyle
    }
    if (cursor.status !== CursorStatus.Dragging) return null
    return (
        <>
            {transformHelper.closestSnapLines.map((line, key) => {
                if (line.type !== 'normal') return null
                return (
                    <div
                        key={key}
                        className={cls(prefix, hashId)}
                        style={createLineStyle(line.rect)}
                    ></div>
                )
            })}
        </>
    )
})

SnapLine.displayName = 'SnapLine'
