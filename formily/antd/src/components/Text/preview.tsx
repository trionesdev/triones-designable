import React from 'react'
import {createBehavior, createResource} from '@trionesdev/designable-core'
import {DnFC, useCssInJs} from '@trionesdev/designable-react'
import {createVoidFieldSchema} from '../Field'
import {AllSchemas} from '../../schemas'
import {AllLocales} from '../../locales'
import cls from 'classnames'
import {genTextStyle} from "./styles";

// import './styles.less'

export interface IDesignableTextProps {
    value?: string
    content?: string
    mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p'
    style?: React.CSSProperties
    className?: string
}

export const Text: DnFC<IDesignableTextProps> = (props) => {
    const tagName = props.mode === 'normal' || !props.mode ? 'div' : props.mode
    const prefix = "dn-text"
    const {hashId, wrapSSR} = useCssInJs({prefix, styleFun: genTextStyle})
    return wrapSSR(React.createElement(
        tagName,
        {
            ...props,
            className: cls(props.className, prefix, hashId),
            'data-content-editable': 'x-component-props.content',
        },
        props.content
    ))
}

Text.Behavior = createBehavior({
    name: 'Text',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Text',
    designerProps: {
        propsSchema: createVoidFieldSchema(AllSchemas.Text),
    },
    designerLocales: AllLocales.Text,
})

Text.Resource = createResource({
    icon: 'TextSource',
    elements: [
        {
            componentName: 'Field',
            props: {
                type: 'string',
                'x-component': 'Text',
            },
        },
    ],
})
