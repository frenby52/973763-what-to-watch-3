import * as React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {connect} from "react-redux";
import {isAuth} from "../../reducer/user/selectors";

type PrivateRouteProps = RouteProps & {
  isAuthed: boolean;
  render: (props: RouteProps) => React.ReactNode;
};

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = (props: PrivateRouteProps) => {
  const {render, path, exact, isAuthed} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={(routerProps) => {
        return isAuthed ? (
          render(routerProps)
        ) : (
          <Redirect push to={`/login`} />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthed: isAuth(state),
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
