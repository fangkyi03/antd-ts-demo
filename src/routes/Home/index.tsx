import * as React from "react";
import styles from "./index.scss";
import { createSafeView, createForm } from 'antdKit';
import { FormInput } from '../../antdKit/utils/renderForm';
class App extends React.Component<any, any> {

  renderForm = () => {
    return createForm('HomeForm',this.formData)
  };

  formData: [FormInput,FormInput] = [
    {
      type: "input",
      name: "测试",
      key: "test",
    },
    {
      type:'input',
      name:'演示',
      key:'test1'
    }
  ];

  formView: any = this.renderForm();

  render() {
    const FormView = this.formView;
    return <div className={styles.main}>
        <a>asdasdas</a>
        {/* {FormView} */}
        <FormView />
      </div>;
  }
}

export default createSafeView("Home")(App);
