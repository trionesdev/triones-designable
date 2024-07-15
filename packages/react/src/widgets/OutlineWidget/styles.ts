import { GlobalToken } from 'antd';
import { CSSInterpolation } from '@ant-design/cssinjs';

export const genOutlineTreeWidgetStyle = (
  prefixCls: string,
  token: GlobalToken,
): CSSInterpolation => [
  {
    [`.${prefixCls}`]: {
      [`&-container`]: {
        position: 'relative',
        minHeight: '100px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: `#fff`,
      },
      [`&-header`]: {
        display: 'flex',
        padding: '8px',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid #eee`,
        color: `#333`,
      },
      [`&-title`]: {
        fontSize: '16px',
        fontWeight: 500,
      },
      [`&-close`]: {
        display: 'flex',
        alignItems: 'center',
        transform: 'scale(1.6)',
        cursor: 'pointer',
      },
      [`&-content`]: {
        position: 'relative',
        flexGrow: 1,
        height: '100%',
        width: '100%',
        paddingBottom: '20px',
        overflow: 'overlay',
      },
      [`&-aux`]: {
        position: 'absolute',
        top: 0,
        left: 0,
      },
      [`&-insertion`]: {
        backgroundColor: `rgba(24, 144, 255, 1)`,
      },
      [`&-node`]: {
        position: 'relative',
        userSelect: 'none',
        width: 'fit-content',
        minWidth: '100%',
        [`&.expanded`]: {
          [`& > .dn-outline-tree-node-header`]: {
            [`.dn-outline-tree-node-expand`]: {
              transform: `rotate(0)`,
            },
          },
          [`& > .dn-outline-tree-node-children`]: {
            display: 'block',
          },
        },
        [`&.selected`]: {
          [`& > .dn-outline-tree-node-header`]: {
            backgroundColor: '#eee',
            [`.dn-outline-tree-node-header-head`]: {
              backgroundColor: '#eee',
            },
          },
        },
        [`&.droppable`]: {
          [`& > .dn-outline-tree-node-header`]: {
            [`.dn-outline-tree-node-header-content`]: {
              [`.dn-outline-tree-node-header-base`]: {
                [`& > .dn-outline-tree-node-icon`]: {
                  transform: 'scale(1.2)',
                },
              },
            },
          },
        },
        [`&-hidden-icon:not(.hidden)`]: {
          display: 'none',
        },
        [`&-header`]: {
          display: 'flex',
          minHeight: '32px',
          width: 'fit-content',
          minWidth: '100%',
          alignItems: 'center',
          color: `#333`,
          position: 'relative',
          paddingLeft: '8px',
          [`&:hover`]: {
            [`.dn-outline-tree-node-header-content`]: {
              color: 'rgba(24, 144, 255, 1)',
            },
            [`.dn-outline-tree-node-hidden-icon`]: {
              display: 'block',
            },
          },
        },
        [`&-header-head`]: {
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          pointerEvents: 'none',
        },
        [`&-header-content`]: {
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.15s ease-in',
          transformOrigin: 'left',
          width: 'fit-content',
          minWidth: '100%',
          height: '100%',
          justifyContent: 'space-between',
          fontSize: '12px',
        },
        [`&-header-base`]: {
          display: 'flex',
          alignItems: 'center',
        },
        [`&-header-actions`]: {
          display: 'flex',
          alignItems: 'center',
          marginRight: '8px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
        [`&-expand`]: {
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.15s ease-out',
          transform: 'rotate(-90deg)',
          marginRight: '3px',
          width: '12px',
        },
        [`&-icon`]: {
          marginRight: '5px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '12px',
          textRendering: 'optimizeLegibility',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
        [`&-title`]: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          marginRight: '100px',
        },
        [`&-actions`]: {
          fontSize: '12px',
          flexGrow: 2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
        [`&-children`]: {
          paddingLeft: '16px',
          display: 'none',
          width: 'fit-content',
          minWidth: '100%',
        },
      },
    },
  },
];
