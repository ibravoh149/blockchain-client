import axios from 'axios';
import {
  USER_SIGNUP,
  REQUEST_SIGNUP,
  SIGNUP_ERRORS,
  USER_LOGGEDIN,
  USER_PROFILE
} from './types';
import { BASE_URL } from '../helpers/baseurl';
import jwt_decode from 'jwt-decode';


/**
 * @description A function to dispatch an action on user signup success
 * 
 * @param {object} user user object
 * 
 * @return {Object} action dispatch by the action creator
 */
export const signupAction = (user) => {
  return {
    type: USER_SIGNUP,
    payload: user
  }
};



/**
 * @description A function to dispatch an action on requesting user signup
 * 
 * @param {boolean} isRequesting
 * 
 * @return {Object} action dispatch by the action creator
 */
export const requestSignup = (isRequesting) => {
  return {
    type: REQUEST_SIGNUP,
    payload: isRequesting
  }
};

/**
 * @description A function to dispatch an action on user signup success
 * 
 * @param {object} isLoggedIn user object
 * 
 * @return {Object} action dispatch by the action creator
 */
export const loggedIn = (isLoggedIn) => {
  return {
    type: USER_LOGGEDIN,
    payload: isLoggedIn
  }
};

/**
 * @description A function to dispatch an action on user sigup error
 * 
 * @param {object} errors
 * 
 * @return {Object} action dispatch by the action creator
 */
export const signupError = (errors) => {
  return {
    type: SIGNUP_ERRORS,
    payload: errors
  }
};

/**
 * @description A function to sigup a user
 * 
 * @param {object} userDetails
 * @param {object} Materialize
 * @param {object} history
 * 
 * @return {Object} action dispatch by the action creator
 */
export const signup = (userDetails, history) => {
  return dispatch => {
    dispatch(requestSignup({ isRequesting: true }));
    dispatch(signupAction({ user: {} }));
    dispatch(loggedIn({ loggedIn: false }));
    dispatch(signupError({ error: {} }));
  

    const {
     
      email,
      password,
      confirmPassword, username
    } = userDetails

    const userInfo = {
     
      email,
      password,
      confirmPassword,
      username
    }
    return axios.post(`${BASE_URL}/user/create`, userInfo)
      .then(response => {
        dispatch(requestSignup({ isRequesting: false }));
        if (response) {
          const { data: { user, token } } = response;
          const userInfo= jwt_decode(token);
          dispatch(loggedIn({ loggedIn: true }));
          dispatch(signupAction(user:userInfo));
          window.localStorage.setItem('userToken', token);
          history.push('/dashboard')
        }
      })
      .catch(error => {
        console.log(error);
        const { response: { status, data: { message } } } = error;
        dispatch(requestSignup({ isRequesting: false }));
        dispatch(signupError({
          error: {
            status,
            message
          }
        }));
        if (status === 400) {
          message.map(err => {
            // return Materialize.toast({html: err.msg, classes:'red'});
            alert('400 error ' + err.msg);
          });
        } else if (status === 401) {
          alert('401 error  ' + message);
          
            // return Materialize.toast({html: message, classes:'red'});
            // return Materialize.toast(message, 5000, 'red');
        } else if (status === 409) {
          alert('409 error ' + message);
          
            // return Materialize.toast({html: message, classes:'red'});
            // return Materialize.toast(message, 5000, 'red');
        } else {
          alert('500 error ' + message);
          // return Materialize.toast("Error Sigin up, please try again later", 5000, 'red');
        }
      });
  }
};