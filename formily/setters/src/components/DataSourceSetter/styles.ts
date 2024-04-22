import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genDataSourceSetterStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      [`::-webkit-scrollbar`]: {
        width: '5px',
        height: '5px',
      },
      [`::-webkit-scrollbar-thumb`]: {
        backgroundColor: `rgba(0, 0, 0, 0.2)`,
        borderRadius: 0,
        transition: 'all 0.25s ease-in-out',
      },
      [`::-webkit-scrollbar-thumb:hover`]: {
        backgroundColor: `rgba(0, 0, 0, 0.3)`,
      },
      [`&-node-title`]: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [`&-icon`]: {
          transition: `all 0.15s ease-in-out`,
          opacity: 0,
          [`&:hover`]: {
            color: token.colorPrimary,
          },
        },
      },
      [`&-layout`]: {
        display: 'flex',
        justifyContent: 'space-around',
        border: `1px solid ${token.colorBorder}`,
        borderRadius: '3px',
        [`.ant-tree-treenode`]: {
          paddingRight: '10px',
          whiteSpace: 'nowrap',
          [`&:hover`]: {
            [`.dn-data-source-setter-node-title-icon`]: {
              opacity: 1,
            },
          },
        },
        [`&-item`]: {
          position: 'relative',
          [`&.left`]: {
            width: `40%`,
            borderRight: `1px solid ${token.colorBorder}`,
          },
          [`&.right`]: {
            width: '60%',
          },
          [`&-header`]: {
            display: 'flex',
            flex: 'none',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '40px',
            padding: '8px 12px 9px',
            borderBottom: `1px solid ${token.colorBorder}`,
            borderRadius: '2px 2px 0 0',
          },
          [`&-content`]: {
            padding: '2%',
            height: '300px',
            maxHeight: '300px',
            overflow: 'scroll',
          },
        },
      },
    },
  },
];
