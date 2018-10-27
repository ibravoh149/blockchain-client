import { 
  USER_LOGIN, LOGIN_ERRORS, USER_LOGGEDIN, 
  USER_PROFILE, USER_SIGNUP, SIGNUP_ERRORS, REQUEST_EDIT_PROFILE, EDIT_PROFILE, EDIT_PROFILE_ERROR
  , GET_FRIENDS, GET_BALANCE,GET_RECENT_TRANSACTION
} from '../actions/types';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, user: action.payload };

    case USER_SIGNUP:
      return { ...state, user: action.payload };

    case SIGNUP_ERRORS:
      return { ...state, ...action.payload };

    case LOGIN_ERRORS:
      return { ...state, error: action.payload };

    case USER_LOGGEDIN:
      return { ...state, ...action.payload };

    case USER_PROFILE:
      return { ...state, ...action.payload };

    case EDIT_PROFILE:
      return { ...state,  ...action.payload };

    case REQUEST_EDIT_PROFILE:
      return { ...state, ...action.payload };

    case EDIT_PROFILE_ERROR:
      return { ...state, ...action.payload };

    case GET_FRIENDS:
      return { ...state,  ...action.payload };
      
    case GET_BALANCE:
      return { ...state, ...action.payload };

    case GET_RECENT_TRANSACTION:
      return { ...state, ...action.payload };
    
    // case CHANGE_PASSWORD_ERROR:
    // return{ ...state, ...action.payload};

    // case GET_USERS:
    //   return { ...state, ...action.payload };

    // case GET_USERS_ERROR:
    //   return { ...state, ...action.payload };
    
    // case REQUEST_GET_USERS:
    // return{ ...state, ...action.payload};
  }
  return state;
}

export default userReducer;