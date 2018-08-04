import * as React from 'react';
import { Table,  } from 'antd';
import { TableProps } from 'antd/lib/table';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { ButtonType } from 'antd/lib/button';

export interface FormTableProps extends TableProps<any>{ 
  isShow?:boolean;
  form?:WrappedFormUtils;
  tabHeaderButton:tabHeaderButtonProps[];
}

export interface tabHeaderButtonProps {
  title:string;
  type:ButtonType;
  onClick?:()=>void
}

export default class FormTable extends React.Component<FormTableProps, any> {
  render() {
    return (
        <div>
          <Table columns={this.props.columns} dataSource={this.props.dataSource} loading={this.props.isShow}/>
        </div>
    );
  }
}
