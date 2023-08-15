import {Space} from "antd";
import {connect} from "@formily/react";
import {Graph} from "@antv/x6";
import {FC} from "react";

type BaseNodeProps = {
    data?: any,
    graph?: Graph
}
const BaseNodeBase: FC<BaseNodeProps> = ({
                                             data, graph
                                         }) => {
    return <Space style={{
        width: 190,
        height: 36,
        border: '1px solid #c2c8d5',
        paddingLeft: 8,
        paddingRight: 8,
        boxSizing: 'border-box'
    }}>
        <div>{data?.props?.title || data?.label || '默认组件'}</div>
    </Space>
}
export const BaseNode = connect(BaseNodeBase)