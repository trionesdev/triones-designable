import React, { useEffect, useState } from 'react';
import { requestIdle } from '@trionesdev/designable-shared';
import { observer } from '@formily/reactive-react';
import { TextWidget, IconWidget } from '../widgets';
import { useCssInJs, usePrefix, useWorkbench } from '../hooks';
import cls from 'classnames';
import { genSettingsPanelStyle } from './styles';

export interface ISettingPanelProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  extra?: React.ReactNode;
}

export const SettingsPanel: React.FC<ISettingPanelProps> = observer((props) => {
  const prefix = usePrefix('settings-panel');
  const workbench = useWorkbench();
  const [innerVisible, setInnerVisible] = useState(true);
  const [pinning, setPinning] = useState(false);
  const [visible, setVisible] = useState(true);
  const { hashId, wrapSSR } = useCssInJs({
    prefix,
    styleFun: genSettingsPanelStyle,
  });

  useEffect(() => {
    if (visible || workbench.type === 'DESIGNABLE') {
      if (!innerVisible) {
        requestIdle(() => {
          requestAnimationFrame(() => {
            setInnerVisible(true);
          });
        });
      }
    }
  }, [visible, workbench.type]);

  if (workbench.type !== 'DESIGNABLE') {
    if (innerVisible) setInnerVisible(false);
    return null;
  }
  if (!visible) {
    if (innerVisible) setInnerVisible(false);
    return wrapSSR(
      <div
        className={cls(prefix + '-opener', hashId)}
        onClick={() => {
          setVisible(true);
        }}
      >
        <IconWidget infer="Setting" size={20} />
      </div>,
    );
  }
  return wrapSSR(
    <div className={cls(prefix, { pinning }, hashId)}>
      <div className={cls(prefix + '-header', hashId)}>
        <div className={cls(prefix + '-header-title', hashId)}>
          <TextWidget>{props.title}</TextWidget>
        </div>
        <div className={cls(prefix + '-header-actions', hashId)}>
          <div className={cls(prefix + '-header-extra', hashId)}>
            {props.extra}
          </div>
          {!pinning && (
            <IconWidget
              infer="PushPinOutlined"
              className={prefix + '-header-pin'}
              onClick={() => {
                setPinning(!pinning);
              }}
            />
          )}
          {pinning && (
            <IconWidget
              infer="PushPinFilled"
              className={prefix + '-pin-filled'}
              onClick={() => {
                setPinning(!pinning);
              }}
            />
          )}
          <IconWidget
            infer="Close"
            className={prefix + '-header-close'}
            onClick={() => {
              setVisible(false);
            }}
          />
        </div>
      </div>
      <div className={cls(prefix + '-body', hashId)}>
        {innerVisible && props.children}
      </div>
    </div>,
  );
});
