import axios from 'axios';
import { GET_FRIENDS } from './types';
import swal from 'sweetalert';
import { BASE_URL } from '../helpers/baseurl';
import  header from '../helpers/getHeader';


/**
 * @description A function to dispatch an action on user created business
 * 
 * @param {object} user business object
 * 
 * @return {Object} action dispatch by the action creator
 */
export const getFriendsActiion = (friends) => {
  return {
    type: GET_FRIENDS,
    payload: friends
  }
};


/**
 * @description A function to dispatch an action on user create business error
 * 
 * @param {array} error
 * 
 * @return {Object} action dispatch by the action creator
 */
// export const createBusinessError = (error) => {
//   return {
//     type: CREATE_BUSINESS_ERROR,
//     payload: error
//   }
// };

// export const isRequesting = (isRequestingCreateBusiness) => {
//     return {
//       type: REQUEST_CREATE_BUSINESS,
//       payload: isRequestingCreateBusiness
//     }
//   };

/**
 * @description A function to create businesses
 * 
 * @param {object} Materialize
 * @param {object} history
 * @param {object} businessInfo
 * 
 * @return {Object} action dispatch by the action creator
 */
export const getFriends = () => {
  return dispatch => {
    // dispatch(createBusinessError(null));
    // dispatch(isRequesting({requesting:true}));
    dispatch(getFriendsActiion({}));
    return axios.get(`${BASE_URL}/user/get-friends`, header())
      .then(response => {
        if (response) {
          const { data: { friends } } = response;
          dispatch(getFriendsActiion({friends}));
        //   dispatch(isRequesting({requestingCreate:false}));
        //   dispatch(createBusinessError(null));
        //   return history.push(window.location.pathname);
        }
      }).catch(error => {
        const { response: { status, data: { message } } } = error;
        // dispatch(isRequesting({ requestingCreate: false }));
        // dispatch(createBusinessError({
        //   error: {
        //     status,
        //     message
        //   }
        // }));
        if (status === 400) {
          message.map(err => {
              alert(err.msg)
            // Materialize.toast({html:err.msg, classes:'red'});
          });
        } else if (status === 401) {
              alert(message)
            //   Materialize.toast({html:message, classes: 'red'});
        }
        else if (status === 403) {
              alert(message)
              // Materialize.toast({html:message, classes: 'red'});
         }
         else if (status === 404) {
          dispatch(getFriendsActiion({friends:[]}));

            // alert(message)
            // Materialize.toast({html:message, classes: 'red'});
       }
        else {
              alert(message)
              //   Materialize.toast({html:error, classes:'red'});
        }
      });
  }
}
