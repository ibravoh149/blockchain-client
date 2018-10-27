import axios from 'axios';
import { USER_LOGIN, USER_LOGGEDIN, LOGIN_ERRORS, USER_PROFILE } from './types';
import swal from 'sweetalert';
import { BASE_URL } from '../helpers/baseurl';
import jwt_decode from 'jwt-decode';


/**
 * @description A function to dispatch an action on user sigin success
 * 
 * @param {object} user user object
 * 
 * @return {Object} action dispatch by the action creator
 */
export const userSignin = (user) => {
  return {
    type: USER_LOGIN,
    payload: user
  }
};



/**
 * @description A function to dispatch an action on user loggedIn
 * 
 * @param {boolean} isLoggedIn
 * 
 * @return {Object} action dispatch by the action creator
 */
export const userLogged = (isLoggedIn) => {
  return {
    type: USER_LOGGEDIN,
    payload: isLoggedIn
  }
};

/**
 * @description A function to dispatch an action on user signin error
 * 
 * @param {array} error
 * 
 * @return {Object} action dispatch by the action creator
 */
export const signinError = (error) => {
  return {
    type: LOGIN_ERRORS,
    payload: error
  }
};

/**
 * @description A function to signin a user
 * 
 * @param {object} userInfo
 * @param {object} Materialize
 * @param {object} history
 * 
 * @return {Object} action dispatch by the action creator
 */
export const signin = (userInfo,history) => {
  window.localStorage.removeItem('userToken');
  return dispatch => {
    dispatch(signinError(null));
    dispatch(userLogged({ loggedIn: false }));
    dispatch(userSignin({}));
    const { email, password } = userInfo;
    return axios.post(`${BASE_URL}/user/login`, {
      email,
      password
    })
      .then(response => {
        if (response) {
          const { data: { user, token } } = response;
          const userInfo = jwt_decode(token);
          dispatch(userLogged({ loggedIn: true }));
          dispatch(userSignin(user:userInfo));
          window.localStorage.setItem('userToken', token);
          history.push('/dashboard')
        }
      }).catch(error => {
        const { response: { status, data: { message } } } = error;
        dispatch(userLogged({ loggedIn: false }));
        dispatch(signinError({
          error: {
            status,
            message
          }
        }));
        if (status === 400) {
          message.map(err => {
            // Materialize.toast({html:err.msg, classes:'red'});
            alert(err.msg)
          });
        } else if (status === 401) {
          // Materialize.toast({html:message, classes: 'red'});
          alert(message);
        } else {
          alert(message);
          // Materialize.toast({html:error, classes:'red'});
        }
      });
  }
}


export const adminSignin=(userInfo,history, Materialize, swal)=>{
  window.localStorage.removeItem('userToken');
  return dispatch => {
    dispatch(signinError(null));
    dispatch(userLogged({ loggedIn: false }));
    dispatch(userSignin({}));
    const { email, password } = userInfo;
    return axios.post(`${BASE_URL}/users/local/signin`, {
      email,
      password
    })
      .then(response => {
        if (response) {
          const { data: { userInfo, token } } = response;
          if(!validateAdmin(userInfo.role)){
            window.localStorage.removeItem('userToken');
            dispatch(userLogged({ loggedIn: false }));
            dispatch(userSignin({}));
            swal({
              title:'Forbidden',
              text:'You don\'t have permission to proceed',
              icon: "danger",
              buttons: false,
              timer: 3000
              });
            history.push('/admin/signin');
          }
          const user = jwt_decode(token);
          dispatch(userLogged({ loggedIn: true }));
          dispatch(userSignin(user));
          window.localStorage.setItem('userToken', token);
           return history.push('/admin/main')
        }
      }).catch(error => {
        const { response: { status, data: { message } } } = error;
        dispatch(userLogged({ loggedIn: false }));
        dispatch(signinError({
          error: {
            status,
            message
          }
        }));
        if (status === 400) {
          message.map(err => {
            Materialize.toast({html:err.msg, classes:'red'});
          });
        } else if (status === 401) {
          Materialize.toast({html:message, classes: 'red'});
        } else {
          Materialize.toast({html:error, classes:'red'});
        }
      });
  }
}

/**
 * @description A function to logout a user
 * 
 * @param {object} history
 * 
 * @return {Object} action dispatch by the action creator
 */
export const signOut = (history) => {
  return dispatch => {
    window.localStorage.removeItem('userToken');
    dispatch(userSignin({}));
    dispatch(userLogged({ loggedIn: false }));
    history.push('/manager/signin');
  }
}