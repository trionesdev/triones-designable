import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genDesignerToolsWidgetStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      display: 'flex',
      alignItems: 'center',
      [`.ant-input-number`]: {
        fontSize: '12px !important',
        background: `#fff !important`,
        borderColor: `#eee !important`,
        [`.ant-input-number-handler-wrap,.ant-input-number-handler`]: {
          background: `#fff !important`,
          borderColor: `#eee !important`,
          color: `#222 !important`,
        },
        [`.ant-input-number-handler-down-inner,.ant-input-number-handler-up-inner`]:
          {
            color: `#222 !important`,
          },
        [`&:hover`]: {
          borderColor: `#eee !important`,
        },
      },
    },
  },
];
