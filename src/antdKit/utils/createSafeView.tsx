import * as React from "react";
import { connect } from "react-redux";
import api from "./api";

interface SafeViewProps {
  Component?: React.SFC;
  modelName?: string;
}

export default function createSafeView(
  modelName: string,
  option?: any
) {
  class SafeView extends React.Component<SafeViewProps> {
    
    constructor(props: SafeViewProps) {
      super(props);
    }

    componentWillMount (){
      api.clear(this.props.modelName!);
    }

    render() {
      const { Component, ...arg } = this.props;
      const Com = Component!
      return <Com {...arg} />;
    }
  }

  return (Component: React.ReactNode) => {
    return connect(
      state => ({ ...state[modelName], Component, modelName }),
      null,
      null,
      option
    )
    (SafeView);
  };
}
