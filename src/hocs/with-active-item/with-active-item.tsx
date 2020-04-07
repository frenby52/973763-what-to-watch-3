import * as React from "react";
import {Subtract} from "utility-types";

interface State {
  activeItem: number;
}

interface InjectingProps {
  activeItem: number;
  onActiveItemChange: () => void;
}

const withActiveItem = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithActiveItem extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: -1
      };

      this._handleActiveItemChange = this._handleActiveItemChange.bind(this);
    }

    _handleActiveItemChange(activeItem) {
      this.setState({activeItem});
    }

    render() {
      const {activeItem} = this.state;

      return <Component
        {...this.props}
        activeItem={activeItem}
        onActiveItemChange={this._handleActiveItemChange}
      />;
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
