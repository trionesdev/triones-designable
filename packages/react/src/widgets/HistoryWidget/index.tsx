import React from 'react';
import format from 'dateformat';
import { observer } from '@formily/reactive-react';
import { useCssInJs, usePrefix, useWorkbench } from '../../hooks';
import { TextWidget } from '../TextWidget';
import cls from 'classnames';
// import './styles.less'
import { genHistoryWidgetStyle } from './styles';

export const HistoryWidget: React.FC = observer(() => {
  const workbench = useWorkbench();
  const currentWorkspace =
    workbench?.activeWorkspace || workbench?.currentWorkspace;
  const prefix = usePrefix('history');
  const { hashId, wrapSSR } = useCssInJs({
    prefix,
    styleFun: genHistoryWidgetStyle,
  });
  if (!currentWorkspace) return null;
  return wrapSSR(
    <div className={cls(prefix, hashId)}>
      {currentWorkspace.history.list().map((item, index) => {
        const type = item.type || 'default_state';
        const token = type.replace(/\:/g, '_');
        return (
          <div
            className={cls(
              prefix + '-item',
              {
                active: currentWorkspace.history.current === index,
              },
              hashId,
            )}
            key={item.timestamp}
            onClick={() => {
              currentWorkspace.history.goTo(index);
            }}
          >
            <span className={cls(prefix + '-item-title', hashId)}>
              <TextWidget token={`operations.${token}`} />
            </span>
            <span className={cls(prefix + '-item-timestamp', hashId)}>
              {' '}
              {format(item.timestamp, 'yy/mm/dd HH:MM:ss')}
            </span>
          </div>
        );
      })}
    </div>,
  );
});
