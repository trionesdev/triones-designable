import React, {FC, useState} from "react";
import {IResource, IResourceLike, isResourceHost, isResourceList} from "../../core";
import {observer} from "@formily/react";
import {Col, GlobalToken, Row, Space, theme} from "antd";
import {CSSInterpolation, useStyleRegister} from "@ant-design/cssinjs";
import classNames from "classnames";
import {DownOutlined, RightOutlined} from "@ant-design/icons";
import _ from "lodash";

const {useToken} = theme;
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
                cursor: 'pointer'
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
                <Row>
                    {sourcesList.map((source) => <Col span={12}>sss</Col>)}
                </Row>
            </div>
        </div>
    )
})