import React from 'react';
import { MobileBody } from './body';
import { useCssInJs, usePrefix } from '../../hooks';
import cls from 'classnames';
// import './styles.less'
import { genMobileSimulatorStyle } from './styles';

export interface IMobileSimulatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
}

export const MobileSimulator: React.FC<IMobileSimulatorProps> = (props) => {
  const prefix = usePrefix('mobile-simulator');
  const { hashId, wrapSSR } = useCssInJs({
    prefix,
    styleFun: genMobileSimulatorStyle,
  });
  return wrapSSR(
    <div {...props} className={cls(prefix, props.className, hashId)}>
      <div className={cls(prefix + '-content', hashId)}>
        <MobileBody>{props.children}</MobileBody>
      </div>
    </div>,
  );
};
