import React from 'react';
import PropTypes from "prop-types";
import {getAuthUser, isAuth} from "../../reducer/user/selectors.js";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

const BASE_URL = `https://htmlacademy-react-3.appspot.com/`;

export const UserBlock = (props) => {
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
