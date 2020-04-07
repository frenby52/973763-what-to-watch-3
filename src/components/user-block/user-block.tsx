import * as React from "react";
import {getAuthUser, isAuth} from "../../reducer/user/selectors";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

const BASE_URL = `https://htmlacademy-react-3.appspot.com/`;

type UserBlockProps = {
  authUserData: {
    id: number;
    email: string;
    name: string;
    avatarUrl: object;
  };
  isAuthed: boolean;
};

export const UserBlock: React.FunctionComponent<UserBlockProps> = (props: UserBlockProps) => {
  const {isAuthed, authUserData} = props;

  return (
    <div className="user-block">
      {isAuthed
        ? <div className="user-block__avatar">
          <Link to="/mylist">
            <img src={`${BASE_URL}${authUserData.avatarUrl}`} alt={authUserData.name} width="63" height="63"/>
          </Link>
        </div>
        : <Link to='/login' className="user-block__link">Sign in</Link>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthed: isAuth(state),
  authUserData: getAuthUser(state),
});

export default connect(mapStateToProps)(UserBlock);
