import { FC, useMemo } from 'react';
import { TreeNode } from '@trionesdev/designable-core';
import { IDesignerComponents } from '@trionesdev/designable-react';
import { createSchemaField } from '@formily/react';
import { createForm } from '@formily/core';
import { transformToSchema } from '@trionesdev/designable-formily-transformer';
import { Form } from '@formily/antd-v5';
type PreviewWidgetProps = {
  tree: TreeNode,
  components: IDesignerComponents;
}
export const PreviewWidget:FC<PreviewWidgetProps> = ({tree,components})=>{
  const SchemaField = createSchemaField({
    components: components,
  })

  const form = useMemo(() => createForm(), [])
  const { form: formProps, schema } = transformToSchema(tree)

  return (
    <Form {...formProps} form={form}>
      <SchemaField schema={schema} />
    </Form>
  )
}