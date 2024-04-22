import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genDisplayStyleSetterStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      [`&-radio`]: {
        display: `flex !important`,
        width: '100%',
        [`.ant-radio-button-wrapper`]: {
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
        },
      },
    },
  },
];
