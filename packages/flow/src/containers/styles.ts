import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genFlowDesignerStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      height: '100%',
    },
  },
];

export const genFlowViewportStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      flex: '1 auto',
      display: 'flex',
      backgroundColor: 'white',
      width: 0,
      [`.x6-graph`]: {
        width: '100%!important',
        height: '100%!important',
        [`.x6-graph-background`]: {
          backgroundImage:
            'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuXzAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjkuNSIgeT0iOSIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIj48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiByeD0iMSIgcnk9IjEiIGZpbGw9IiNhYWFhYWEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybl8wKSIvPjwvc3ZnPg==")',
        },
      },
    },
  },
];
