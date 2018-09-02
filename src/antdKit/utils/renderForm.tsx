import * as React from "react";
import { FormItem } from "./renderForm";
import { Form, Input } from "antd";
import { WrappedFormUtils, GetFieldDecoratorOptions } from "antd/lib/form/Form";
import { FormItemProps } from "antd/lib/form";
import { InputProps } from "antd/lib/input";
export interface FormItem {
  /**
   * 表单组件类型
   *
   * @type {("input" | "check")}
   * @memberof FormItem
   */
  type: "input" | "check";
  /**
   * 表单组件名称
   *
   * @type {string}
   * @memberof FormItem
   */
  name: string;
  /**
   * 组件key值
   *
   * @type {string}
   * @memberof FormItem
   */
  key: string;
  /**
   * 表单子组件样式
   *
   * @type {FormItemProps}
   * @memberof FormItem
   */
  itemProps?: FormItemProps;
  /**
   * form组件属性
   *
   * @type {GetFieldDecoratorOptions}
   * @memberof FormItem
   */
  options?: GetFieldDecoratorOptions;
}

export interface FormInput extends FormItem{
    props?:InputProps
}


const createFormItem = (
  Component: React.ReactNode,
  item?: FormItem
) => {
  return <Form.Item {...item!.itemProps} label={item!.name}>{Component}</Form.Item>;
};

const createInput = (item: FormInput) => {
  return (
      <Input {...item.props}/>
  )
};

const createView = (item: FormItem, form: WrappedFormUtils) => {
  return (Component: React.ReactNode) => {
    return form.getFieldDecorator(item.key, item.options)(Component);
  };
};

const renderFormItem = (item: FormItem, form: WrappedFormUtils) => {
  switch (item.type) {
    case "input":
      return createFormItem(
        createView(item, form)(createInput(item)),
        item
      );
    default:
      return createFormItem(
        createView(item, form)(createInput(item)),
        item
      );
  }
};

export default function renderForm(data: FormItem[], form: WrappedFormUtils) {
  return data.map((e, index) => {
    return (
      <React.Fragment key={index}>{renderFormItem(e, form)}</React.Fragment>
    );
  });
}
