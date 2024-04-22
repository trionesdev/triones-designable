import React, { FC, useEffect, useMemo, useState } from 'react';
import { useFlowDesigner, useFlowViewport, useSelectedNode } from '../hooks';
import { observer } from '@formily/reactive-react';
import { useCssInJs } from '@trionesdev/designable-react';
import cls from 'classnames';
import { TreeNode } from '@trionesdev/designable-core';
import { Form } from '@formily/antd-v5';
import { createForm, Form as FormInstance } from '@formily/core';
import { SchemaField } from './SchemaField';
import { genSettingsFormStyle } from './styles';
import { cancelIdle, requestIdle } from '@trionesdev/designable-shared';
import { effectLocales, effectSave } from './effects';

const GlobalState = {
  idleRequest: null,
};

type SettingsFormPanelProps = {
  className?: string;
  style?: React.CSSProperties;
  uploadAction?: string;
  components?: Record<string, React.FC<any>>;
  effects?: (form: FormInstance) => void;
  scope?: any;
};
export const SettingsForm: FC<SettingsFormPanelProps> = observer(
  (props) => {
    const [selectedTreeNode, setSelectedTreeNode] = useState<TreeNode>();
    const schema = selectedTreeNode?.designerProps.propsSchema;
    const prefix = 'af-settings-form';
    const engine = useFlowDesigner();
    const viewport = useFlowViewport();
    const selectedNode = useSelectedNode();
    const { hashId, wrapSSR } = useCssInJs({
      prefix,
      styleFun: genSettingsFormStyle,
    });

    const form = useMemo(
      () =>
        createForm({
          initialValues: {
            'x-component-props': selectedTreeNode?.designerProps.defaultProps,
          },
          values: { 'x-component-props': selectedNode?.data.props },
          effects(form) {
            if (selectedTreeNode) {
              effectLocales(selectedTreeNode);
              effectSave(form, viewport.graph, selectedNode.id);
              props.effects?.(form);
            }
          },
        }),
      [selectedTreeNode, selectedNode, viewport.graph],
    );

    useEffect(() => {
      if (selectedNode) {
        setSelectedTreeNode(
          new TreeNode({
            id: selectedNode.id,
            componentName: engine.componentName,
            props: { type: 'object', 'x-component': selectedNode.shape },
          }),
        );
      }
    }, [selectedNode]);

    return (
      <>
        {selectedNode &&
          wrapSSR(
            <div className={cls(prefix + '-wrapper', hashId)}>
              <div className={cls(prefix + '-content', hashId)}>
                <div
                  className={cls(prefix, props.className, hashId)}
                  style={props.style}
                  key={selectedNode.id}
                >
                  <Form
                    form={form}
                    colon={false}
                    labelWidth={120}
                    labelAlign="left"
                    wrapperAlign="right"
                    feedbackLayout="none"
                    tooltipLayout="text"
                  >
                    <SchemaField
                      schema={schema}
                      components={props.components}
                      scope={{ $node: selectedTreeNode, ...props.scope }}
                    />
                  </Form>
                </div>
              </div>
            </div>,
          )}
      </>
    );
  },
  {
    scheduler: (update) => {
      cancelIdle(GlobalState.idleRequest);
      GlobalState.idleRequest = requestIdle(update, {
        timeout: 500,
      });
    },
  },
);
