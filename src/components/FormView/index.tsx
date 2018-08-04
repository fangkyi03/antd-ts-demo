import * as React from 'react';
import { connect } from 'dvajs';
import { Form } from 'antd';
import { FormProps } from 'antd/lib/form';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface FormViewProps {
    Component:any;
    formConfig:FormProps;
    form:WrappedFormUtils;
}

interface propsDataSouce {
    dataSource:object;
    isEdit:boolean;
}

class FormView extends React.Component<FormViewProps, any> {

  onSubmit = () =>{
    this.props.form.validateFieldsAndScroll((error:string,value:object)=>{
        if (!error) {
            console.log('object',value)
        }
    })
  }

  render() {
    return (
        <Form {...this.props.formConfig} onSubmit={this.onSubmit}>
            {
                 React.cloneElement(this.props.Component,this.props)
            }
        </Form>
    );
  }
}

export default function createForm(modelConfig:string[],formConfig:FormProps = {}) {
    return (Component:any)=>{
        return connect((state = {})=>{
            let obj = {}
            modelConfig.forEach((e:string)=>{
                obj = {...state[e]}
            })
            return obj
        })
        (
            Form.create({
                mapPropsToFields:(props:propsDataSouce) =>{
                    if (!props.isEdit) {
                        return 
                    }
                    const dataSource = props.dataSource || {}
                    const obj = {}
                    Object.keys(dataSource).forEach((e:string)=>{
                        obj[e] = Form.createFormField({
                            value:dataSource[e]
                        })
                    })
                    return obj
                }
            })((props)=><FormView Component={Component} formConfig={formConfig} {...props}/>)
        )
    }
}