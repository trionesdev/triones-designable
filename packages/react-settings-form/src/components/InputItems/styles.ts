import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genInputItemsStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      display: 'flex',
      flexWrap: 'wrap',
      // marginLeft: '-8px',
      [`&-item`]: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        color: token.colorText,
        [`&-icon`]: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 8px',
          flexShrink: 0,
          flexGrow: 0,
          color: token.colorText,
        },
        [`&-controller`]: {
          minWidth: 0,
          flexShrink: 1,
          flexGrow: 1,
          [`.ant-radio-group`]: {
            display: 'flex',
            [`.ant-radio-button-wrapper`]: {
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
            },
          },
        },
        [`&.vertical`]: {
          flexDirection: 'column',
          alignItems: 'flex-start',
          [`.dn-input-items-item-controller`]: {
            width: '100%',
          },
        },
      },
    },
  },
];

export const genInputItemsItemStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {},
  },
];
