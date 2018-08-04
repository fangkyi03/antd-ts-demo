import * as React from "react";
import { connect } from 'dvajs';
import { fetchProps } from '../../config/propsConfig';
// export interface AppProps {}

class App extends React.Component<fetchProps, any> {

  render() {
    return (
      <div>
        asdasd
      </div>
    )
  }
}

export default connect()(App)
