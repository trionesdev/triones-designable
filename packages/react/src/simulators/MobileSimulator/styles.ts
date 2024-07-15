import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genMobileSimulatorStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      position: 'relative',
      minHeight: '100px',
      height: '100%',
      width: '100%',
      backgroundColor: '#eee',
      [`&-content`]: {
        width: '100%',
        top: 0,
        left: 0,
        height: '100%',
        position: 'absolute',
        overflow: 'overlay',
      },
      ['&-body']: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        [`&-content`]: {
          backgroundColor: `#fff`,
          border: `3px solid #222`,
        },
      },
    },
  },
];
