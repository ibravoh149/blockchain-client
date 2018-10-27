import axios from 'axios';
import { LOGIN_ERRORS, USER_PROFILE } from './types';
import swal from 'sweetalert';
import { BASE_URL } from '../helpers/baseurl';
import  header  from "../helpers/getHeader";


 /**
 * @description A function to dispatch an action on user profile info
 * 
 * @param { object } user
 * 
 * @return {Object} action dispatch by the action creator
*/
export const userProfile = (user) => {
  return {
    type:USER_PROFILE,
    payload: user
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
export const getProfile = () => {
  return dispatch => {
    dispatch(signinError(null));
    dispatch(userProfile({ userProfile: {} }));
    return axios.get(`${BASE_URL}/user/get-my-profile`, header())
      .then(response => {
        if (response) {
          const { data: { userInfo } } = response;
         dispatch(userProfile({ userProfile:userInfo }));
        //  history.push(window.location.pathname);

        }
      }).catch(error => {
        const { response: { status, data: { message } } } = error;
        dispatch(signinError({
          error: {
            status,
            message
          }
        }));
       
         if (status === 401) {
        //   Materialize.toast({html:message, classes: 'red'});
        alert(message)
        }else if(status === 401){
        alert(message)
        //   Materialize.toast({html:message, classes: 'red'});
        }
        else {
        alert(message)
        //   Materialize.toast({html:error, classes:'red'});
        }
      });
  }
}