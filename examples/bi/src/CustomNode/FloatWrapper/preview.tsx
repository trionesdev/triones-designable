import { DnFC, useComponents, useDesigner, useTreeNode } from "@alkaid/react";
import { ISchema, ObjectField } from "@formily/react";
import { observer } from "@formily/reactive-react";
import { createBehavior } from "@alkaid/core";
import { FormPath } from "@formily/core";
import { each, isArr, isStr, reduce } from "@alkaid/shared";
import { toJS } from "@formily/reactive";
import React from "react";
import { AllLocales } from "@alkaid/formily-antd";

const SchemaStateMap = {
  title: "title",
  description: "description",
  default: "value",
  enum: "dataSource",
  readOnly: "readOnly",
  writeOnly: "editable",
  required: "required",
  "x-content": "content",
  "x-value": "value",
  "x-editable": "editable",
  "x-disabled": "disabled",
  "x-read-pretty": "readPretty",
  "x-read-only": "readOnly",
  "x-visible": "visible",
  "x-hidden": "hidden",
  "x-display": "display",
  "x-pattern": "pattern",
};
const NeedShownExpression = {
  title: true,
  description: true,
  default: true,
  "x-content": true,
  "x-value": true,
};

const isExpression = (val: any) => isStr(val) && /^\{\{.*\}\}$/.test(val);

const filterExpression = (val: any) => {
  if (typeof val === "object") {
    const isArray = isArr(val);
    const results = reduce(
      val,
      (buf: any, value, key) => {
        if (isExpression(value)) {
          return buf;
        } else {
          const results = filterExpression(value);
          if (results === undefined || results === null) return buf;
          if (isArray) {
            return buf.concat([results]);
          }
          buf[key] = results;
          return buf;
        }
      },
      isArray ? [] : {}
    );
    return results;
  }
  if (isExpression(val)) {
    return;
  }
  return val;
};

const toDesignableFieldProps = (
  schema: ISchema,
  components: any,
  nodeIdAttrName: string,
  id: string
) => {
  const results: any = {};
  each(SchemaStateMap, (fieldKey, schemaKey) => {
    const value = schema[schemaKey];
    if (isExpression(value)) {
      if (!NeedShownExpression[schemaKey]) return;
      if (value) {
        results[fieldKey] = value;
        return;
      }
    } else if (value) {
      results[fieldKey] = filterExpression(value);
    }
  });

  const decorator =
    schema["x-decorator"] && FormPath.getIn(components, schema["x-decorator"]);
  const component =
    schema["x-component"] && FormPath.getIn(components, schema["x-component"]);
  const decoratorProps = schema["x-decorator-props"] || {};
  const componentProps = schema["x-component-props"] || {};

  if (decorator) {
    results.decorator = [decorator, toJS(decoratorProps)];
  }
  if (component) {
    results.component = [component, toJS(componentProps)];
  }
  if (decorator) {
    FormPath.setIn(results["decorator"][1], nodeIdAttrName, id);
  } else if (component) {
    FormPath.setIn(results["component"][1], nodeIdAttrName, id);
  }
  results.title = results.title && (
    <span data-content-editable="title">{results.title}</span>
  );
  results.description = results.description && (
    <span data-content-editable="description">{results.description}</span>
  );
  return results;
};

export const FloatWrapper: DnFC<ISchema> = observer((props) => {
  const designer = useDesigner();
  const components = useComponents();
  const node = useTreeNode();
  const fieldProps = toDesignableFieldProps(
    props,
    components,
    designer.props.nodeIdAttrName,
    node.id
  );
  const { children } = props;

  return (
    <ObjectField {...fieldProps} name={node.id}>
      {children}
    </ObjectField>
  );
});

FloatWrapper.Behavior = createBehavior({
  name: "FloatWrapper",
  selector: "FloatWrapper",
  designerLocales: AllLocales.Field,
});
