import {Space} from "antd";
import {connect} from "@formily/react";
import {Graph} from "@antv/x6";
import {FC} from "react";
import {IconWidget} from "@alkaid/flow";

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
        boxSizing: 'border-box',
        borderRadius: '4px',
        backgroundColor: 'white'
    }}>
        {data?.icon && <IconWidget infer={data.icon} style={{width: 16, height: 16}}/>}
        <div style={{
            color: 'rgba(0, 0, 0, 65%)',
            fontSize: '12px'
        }}>{data?.props?.title}</div>
    </Space>
}
export const BaseNode = connect(BaseNodeBase)