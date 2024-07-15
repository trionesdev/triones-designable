import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genFlexStyleSetterStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      [`.dn-input-items`]: {
        // margin: `-10px -10px 10px`,
        // padding: '10px 10px 0 10px'
      },
    },
  },
];
