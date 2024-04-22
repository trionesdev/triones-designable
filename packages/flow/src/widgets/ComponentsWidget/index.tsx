import {
  DnComponent,
  DnFC,
  IDesignerComponents,
} from '@trionesdev/designable-react';
import React, { FC, useEffect } from 'react';
import { GlobalRegistry } from '@trionesdev/designable-core';
import { register } from '@antv/x6-react-shape';
import { each } from '@trionesdev/designable-shared';
import _ from 'lodash';

type ComponentsWidgetProps = {
  components: IDesignerComponents;
};
export const ComponentsWidget: FC<ComponentsWidgetProps> = ({ components }) => {
  const registerNode = (component: DnFC<any> | DnComponent<any>) => {
    const portAttrs = {
      circle: {
        r: 4,
        magnet: true,
        stroke: '#C2C8D5',
        strokeWidth: 1,
        fill: '#fff',
      },
    };
    component.Behavior.forEach((behavior) => {
      let comp = component;
      let pointIndex = _.indexOf(behavior.name, '.');
      if (pointIndex >= 0) {
        comp = _.get(component, behavior.name.substring(pointIndex + 1));
      }
      register({
        shape: behavior.name,
        width: 190,
        height: 36,
        component: ({ node, graph }) => {
          return (
            <>
              {React.createElement(comp, {
                key: node.id,
                data: node.getData(),
                graph,
              })}
            </>
          );
        },
        ports: {
          groups: {
            top: {
              position: 'top',
              attrs: portAttrs,
            },
            bottom: {
              position: 'bottom',
              attrs: portAttrs,
            },
            left: {
              position: 'left',
              attrs: portAttrs,
            },
            right: {
              position: 'right',
              attrs: portAttrs,
            },
          },
        },
      });
    });
  };

  useEffect(() => {
    GlobalRegistry.registerDesignerBehaviors(components);
    each(components, (currentValue, key) => registerNode(currentValue));
  }, []);
  return <></>;
};
