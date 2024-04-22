import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genBorderStyleSetterStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      display: 'flex',
      [`&-position`]: {
        marginLeft: '-10px',
      },
      [`&-input`]: {
        height: '110px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: '10px',
      },
    },
    [`.border-style-solid-line`]: {
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'block',
      [`&::after`]: {
        position: 'absolute',
        top: '50%',
        left: 0,
        display: 'block',
        content: "' '",
        height: 0,
        width: '100%',
        borderTop: '2px solid currentColor',
        transform: 'translateY(-50%)',
      },
    },
    [`.border-style-dashed-line`]: {
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'block',
      [`&::after`]: {
        position: 'absolute',
        top: '50%',
        left: 0,
        display: 'block',
        content: "' '",
        height: 0,
        width: '100%',
        borderTop: '2px dashed currentColor',
        transform: 'translateY(-50%)',
      },
    },
    [`.border-style-dotted-line`]: {
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'block',
      [`&::after`]: {
        position: 'absolute',
        top: '50%',
        left: 0,
        display: 'block',
        content: "''",
        height: 0,
        width: '100%',
        borderTop: '2px dotted currentColor',
        transform: 'translateY(-50%)',
      },
    },
  },
];
