import React, {useState} from 'react'
import {
    isResourceHost,
    isResourceList,
    IResourceLike,
    IResource,
} from '@trionesdev/designable-core'
import {isFn} from '@trionesdev/designable-shared'
import {observer} from '@formily/reactive-react'
import {useCssInJs, usePrefix} from '../../hooks'
import {IconWidget} from '../IconWidget'
import {TextWidget} from '../TextWidget'
import cls from 'classnames'
// import './styles.less'
import {genResourceWidgetStyle} from "./styles";

export type SourceMapper = (resource: IResource) => React.ReactNode

export interface IResourceWidgetProps {
    title: React.ReactNode
    sources?: IResourceLike[]
    className?: string
    defaultExpand?: boolean
    children?: SourceMapper | React.ReactElement
}

export const ResourceWidget: React.FC<IResourceWidgetProps> = observer(
    (props) => {
        const prefix = usePrefix('resource')
        const {hashId, wrapSSR} = useCssInJs({prefix, styleFun: genResourceWidgetStyle})
        const [expand, setExpand] = useState(props.defaultExpand)
        const renderNode = (source: IResource) => {
            const {node, icon, title, thumb, span} = source
            return (
                <div
                    className={cls(prefix + '-item', hashId)}
                    style={{gridColumnStart: `span ${span || 1}`}}
                    key={node.id}
                    data-designer-source-id={node.id}
                >
                    {thumb && <img className={cls(prefix + '-item-thumb', hashId)} src={thumb}/>}
                    {icon && React.isValidElement(icon) ? (
                        <>{icon}</>
                    ) : (
                        <IconWidget
                            className={cls(prefix + '-item-icon', hashId)}
                            infer={icon}
                            style={{width: 16, height: 16}}
                        />
                    )}
                    <span className={cls(prefix + '-item-text', hashId)}>
            {
                <TextWidget>
                    {title || node.children[0]?.getMessage('title')}
                </TextWidget>
            }
          </span>
                </div>
            )
        }
        const sources = props.sources.reduce<IResource[]>((buf, source) => {
            if (isResourceList(source)) {
                return buf.concat(source)
            } else if (isResourceHost(source)) {
                return buf.concat(source.Resource)
            }
            return buf
        }, [])
        const remainItems =
            sources.reduce((length, source) => {
                return length + (source.span ?? 1)
            }, 0) % 2
        return wrapSSR(
            <div
                className={cls(prefix, props.className, {
                    expand,
                }, hashId)}
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
                    <div className={cls(prefix + '-header-content', hashId)}>
                        <TextWidget>{props.title}</TextWidget>
                    </div>
                </div>
                <div className={cls(prefix + '-content-wrapper', hashId)}>
                    <div className={cls(prefix + '-content', hashId)}>
                        {sources.map(isFn(props.children) ? props.children : renderNode)}
                        {remainItems ? (
                            <div
                                className={cls(prefix + '-item-remain', hashId)}
                                style={{gridColumnStart: `span ${2 - remainItems}`}}
                            ></div>
                        ) : null}
                    </div>
                </div>
            </div>
        )
    }
)

ResourceWidget.defaultProps = {
    defaultExpand: true,
}
