import React, { useEffect, useState } from 'react';
import { requestIdle } from '@trionesdev/designable-shared';
import { observer } from '@formily/reactive-react';
import cls from 'classnames';
import { genSettingsPanelStyle } from './styles';
import {
  IconWidget,
  TextWidget,
  useCssInJs,
} from '@trionesdev/designable-react';
import { useFlowViewport, useSelectedNode } from '../hooks';

export interface ISettingPanelProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  extra?: React.ReactNode;
}

export const SettingsPanel: React.FC<ISettingPanelProps> = observer((props) => {
  const viewport = useFlowViewport();
  const selectedNode = useSelectedNode();
  const prefix = 'af-settings-panel';
  const [innerVisible, setInnerVisible] = useState(true);
  const [pinning, setPinning] = useState(false);
  const { hashId, wrapSSR } = useCssInJs({
    prefix,
    styleFun: genSettingsPanelStyle,
  });

  useEffect(() => {
    if (!innerVisible) {
      requestIdle(() => {
        requestAnimationFrame(() => {
          setInnerVisible(true);
        });
      });
    }
  }, []);

  return (
    selectedNode &&
    wrapSSR(
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
                viewport.cleanSelectedNode();
              }}
            />
          </div>
        </div>
        <div className={cls(prefix + '-body', hashId)}>
          {innerVisible && props.children}
        </div>
      </div>,
    )
  );
});
