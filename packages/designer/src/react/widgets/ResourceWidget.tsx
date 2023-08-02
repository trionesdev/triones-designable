import React, {FC, useState} from "react";
import {IResource, IResourceLike, isResourceHost, isResourceList} from "../../core";
import {observer} from "@formily/react";
import {Button, Col, GlobalToken, Row, Space, theme} from "antd";
import {CSSInterpolation, useStyleRegister} from "@ant-design/cssinjs";
import classNames from "classnames";
import {DownOutlined, RightOutlined} from "@ant-design/icons";
import _ from "lodash";
import {useDrag} from "react-dnd";

const {useToken} = theme;

const genResourceItemStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => {
    return {
        [`.${prefixCls}`]: {
        }
    };
};

type ResourceItemProps = {
    source: IResource
}
const ResourceItem: FC<ResourceItemProps> = ({source}) => {
    debugger
    const [, drag] = useDrag(() => ({type: 'component'}))

    const prefixCls = 'alkaid-designer-resource-item';
    const {theme, token, hashId} = useToken();
    const wrapSSR = useStyleRegister(
        {theme, token, hashId, path: [prefixCls]},
        () => [genResourceItemStyle(prefixCls, token)],
    );

    return <Button ref={drag} className={classNames(prefixCls, hashId)} block={true}>ddd</Button>
}

const genResourceWidgetStyle = (
    prefixCls: string,
    token: GlobalToken,
): CSSInterpolation => {
    return {
        [`.${prefixCls}`]: {
            '&-header': {
                width: '100%',
                border: '1px solid #d9d9d9',
                backgroundColor: '#f9f9f9',
                padding: '5px 8px',
                cursor: 'pointer',
                boxSizing:'border-box'
            }
        }
    };
};

type ResourceWidgetProps = {
    title?: React.ReactNode
    sources?: IResourceLike[]
    defaultExpand?: boolean
}
export const ResourceWidget: FC<ResourceWidgetProps> = observer(({
                                                                     title,
                                                                     sources,
                                                                     defaultExpand
                                                                 }) => {
    const [expand, setExpand] = useState(defaultExpand)


    const prefixCls = 'alkaid-designer-resource-widget';
    const {theme, token, hashId} = useToken();
    const wrapSSR = useStyleRegister(
        {theme, token, hashId, path: [prefixCls]},
        () => [genResourceWidgetStyle(prefixCls, token)],
    );

    const sourcesList = _.reduce(sources, (buf: IResource[], source) => {
        if (isResourceList(source)) {
            return buf.concat(source)
        } else if (isResourceHost(source)) {
            return buf.concat(source.Resource!)
        }
        return buf;
    }, []);

    return wrapSSR(
        <div className={classNames(prefixCls, hashId)}>
            <Space className={classNames(`${prefixCls}-header`, hashId)} onClick={() => {
                setExpand(!expand)
            }}>
                {expand ? <DownOutlined/> : <RightOutlined/>}
                <span>{title}</span>
            </Space>
            <div>
                <Row gutter={[8, 8]}>
                    {sourcesList.map((source) => <Col span={12}>
                        <ResourceItem source={source}/>
                    </Col>)}
                </Row>
            </div>
        </div>
    )
})