import axios from 'axios';
import { GET_RECENT_TRANSACTION } from './types';
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
export const getTransactionAction = (transaction) => {
  return {
    type:GET_RECENT_TRANSACTION,
    payload: transaction
  }
};



/**
 * @description A function to dispatch an action on user signin error
 * 
 * @param {array} error
 * 
 * @return {Object} action dispatch by the action creator
 */
// export const signinError = (error) => {
//   return {
//     type: LOGIN_ERRORS,
//     payload: error
//   }
// };

/**
 * @description A function to signin a user
 * 
 * @param {object} userInfo
 * @param {object} Materialize
 * @param {object} history
 * 
 * @return {Object} action dispatch by the action creator
 */
export const getTransactions = (userAddress) => {
    
  return dispatch => {
    // dispatch(signinError(null));
    dispatch(getTransactionAction({ transactions: {} }));
    return axios.get(`${BASE_URL}/crypto/recent-transactions/${userAddress}`, header())
      .then(response => {
        if (response) {
          const { data: { data } } = response;
         dispatch(getTransactionAction({ transactions:data }));
        //  history.push(window.location.pathname);
        }
      }).catch(error => {
        const { response: { status, data: { message } } } = error;
        // dispatch(signinError({
        //   error: {
        //     status,
        //     message
        //   }
        // }));
       
         if (status === 401) {
        //   Materialize.toast({html:message, classes: 'red'});
        alert(message)
        }
        else if(status === 403){
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