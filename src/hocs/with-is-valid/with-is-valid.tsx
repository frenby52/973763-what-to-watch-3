import * as React from "react";

const withIsValid = (Component) => {
  class WithIsValid extends React.PureComponent {
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

  WithIsValid.propTypes = {};

  return WithIsValid;
};

export default withIsValid;
