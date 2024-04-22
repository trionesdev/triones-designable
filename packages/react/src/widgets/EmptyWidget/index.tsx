import React from 'react';
import { useTree, usePrefix, useCssInJs } from '../../hooks';
import { observer } from '@formily/reactive-react';
import { IconWidget } from '../IconWidget';
// import './styles.less'
import { genEmptyWidgetStyle } from './styles';
import cls from 'classnames';

export interface IEmptyWidgetProps {
  children?: React.ReactNode;
  dragTipsDirection?: 'left' | 'right';
}

export const EmptyWidget: React.FC<IEmptyWidgetProps> = observer((props) => {
  const tree = useTree();
  const prefix = usePrefix('empty');
  const { hashId, wrapSSR } = useCssInJs({
    prefix,
    styleFun: genEmptyWidgetStyle,
  });
  const renderEmpty = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className={cls('animations', hashId)}>
          <IconWidget
            infer={
              props.dragTipsDirection === 'left'
                ? 'DragLeftSourceAnimation'
                : 'DragRightSourceAnimation'
            }
            size={240}
          />
          <IconWidget infer="BatchDragAnimation" size={240} />
        </div>
        <div className={cls('hotkeys-list', hashId)}>
          <div>
            Selection <IconWidget infer="Command" /> + Click /{' '}
            <IconWidget infer="Shift" /> + Click /{' '}
            <IconWidget infer="Command" /> + A
          </div>
          <div>
            Copy <IconWidget infer="Command" /> + C / Paste{' '}
            <IconWidget infer="Command" /> + V
          </div>
          <div>
            Delete <IconWidget infer="Delete" />
          </div>
        </div>
      </div>
    );
  };
  if (!tree?.children?.length) {
    return wrapSSR(
      <div className={cls(prefix, hashId)}>
        {props.children ? props.children : renderEmpty()}
      </div>,
    );
  }
  return null;
});

EmptyWidget.defaultProps = {
  dragTipsDirection: 'left',
};
