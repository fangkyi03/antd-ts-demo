import * as React from "react";
import * as styles from './index.scss'
import { Button, message } from 'antd';


// export interface AppProps {}

export default class App extends React.Component<any, any> {

  onButtonDown = () =>{
    message.error('奥术大师大')
  }

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.children}>
          <div style={{height:500}}/>
          <Button onClick={this.onButtonDown} type={'primary'}>按钮</Button>
          <div style={{height:1000}}/>
        </div>
      </div>
    )
  }
}
