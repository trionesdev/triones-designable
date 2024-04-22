import React from 'react';
import cls from 'classnames';
import { useCssInJs, usePrefix } from '../../hooks';
// import './styles.less'
import { genPCSimulatorStyle } from './styles';

export interface IPCSimulatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
}

export const PCSimulator: React.FC<IPCSimulatorProps> = (props) => {
  const prefix = usePrefix('pc-simulator');
  const { hashId, wrapSSR } = useCssInJs({
    prefix,
    styleFun: genPCSimulatorStyle,
  });
  return wrapSSR(
    <div {...props} className={cls(prefix, props.className, hashId)}>
      {props.children}
    </div>,
  );
};
