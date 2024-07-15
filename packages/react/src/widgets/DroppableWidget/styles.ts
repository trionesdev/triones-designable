import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genDroppableWidgetStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.dn-droppable-placeholder`]: {
      height: '60px',
      backgroundColor: `#f0f0f0`,
      border: `1px dashed #aaa`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: `#666`,
      fontWeight: 'lighter',
      fontSize: '13px',
    },
  },
];
