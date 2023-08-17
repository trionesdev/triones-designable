import {createSchemaField} from "@formily/react";
import {FormItem, Input} from "@formily/antd-v5";
import {CollapseItem} from "./components";

export const SchemaField = createSchemaField({
    components: {
        Input,
        FormItem,
        CollapseItem
    },
})
