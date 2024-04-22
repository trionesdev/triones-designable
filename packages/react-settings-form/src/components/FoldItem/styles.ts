import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genFoldItemStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      [`.ant-formily-item-label-content`]: {
        overflow: 'visible',
      },
      [`&-base`]: {
        cursor: 'pointer',
      },
      [`&-title`]: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '-10px',
        cursor: 'pointer',
        [`.dn-icon`]: {
          transform: 'translateX(-3px)',
          [`svg`]: {
            transition: 'all 0.15s ease-in-out',
            transform: 'rotate(-90deg)',
          },
        },
        [`&.expand`]: {
          [`.dn-icon`]: {
            svg: {
              transform: 'rotate(0deg)',
            },
          },
        },
      },
      [`&-extra`]: {
        margin: '-10px -10px 10px',
        padding: '10px 10px 0 10px',
        backgroundColor: token.colorBgLayout,
      },
    },
  },
];
