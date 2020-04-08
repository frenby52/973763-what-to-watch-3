import * as React from "react";
import {Subtract} from "utility-types";

interface State {
  isValid: boolean;
}

interface InjectingProps {
  isValid: boolean;
  onIsValidChange: () => void;
}

const withIsValid = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithIsValid extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        isValid: false
      };

      this._handleIsValidChange = this._handleIsValidChange.bind(this);
    }

    _handleIsValidChange(isValid) {
      this.setState({isValid});
    }

    render() {
      const {isValid} = this.state;

      return <Component
        {...this.props}
        isValid={isValid}
        onIsValidChange={this._handleIsValidChange}
      />;
    }

  }

  return WithIsValid;
};

export default withIsValid;
