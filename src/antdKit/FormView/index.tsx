import * as React from "react";
import { Form } from "antd";
import { FormProps } from "antd/lib/form";
import { WrappedFormUtils } from "antd/lib/form/Form";
import renderForm, { FormItem } from "../utils/renderForm";
import {createSafeView} from 'antdKit';
import api from "../utils/api";

interface formProps extends formData{
  form: WrappedFormUtils;
  formProp?: FormProps;
}

interface formData {
  dataSource: object;
  isEdit: boolean;
}

export default function createForm(modelName: string,data:FormItem[]) :React.ReactNode {
  class FormView extends React.Component<formProps> {

    componentDidMount() {
      api.initForm(modelName,this.props.form,data)
    }
    
    render() {
      const { formProp,form } = this.props;
      return <Form {...formProp}>{renderForm(data, form)}</Form>;
    }
  }
  return createSafeView(modelName)(Form.create<formData>()<formProps>(FormView))
}
