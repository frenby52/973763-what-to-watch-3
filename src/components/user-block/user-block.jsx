import React from 'react';
import PropTypes from "prop-types";
import {getAuthUser, isAuth} from "../../reducer/user/selectors.js";
import {connect} from "react-redux";

const BASE_URL = `https://htmlacademy-react-3.appspot.com/`;

export const UserBlock = (props) => {
  const {isAuthed, authUserData} = props;

  return (
    <div className="user-block">
      {isAuthed
        ? <div className="user-block__avatar">
          <img src={`${BASE_URL}${authUserData.avatarUrl}`} alt={authUserData.name} width="63" height="63"/>
        </div>
        : <a href="sign-in.html" className="user-block__link">Sign in</a>}
    </div>
  );
};

UserBlock.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  authUserData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  isAuthed: isAuth(state),
  authUserData: getAuthUser(state),
});

export default connect(mapStateToProps)(UserBlock);
