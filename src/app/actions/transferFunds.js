import axios from 'axios';
// import { CREATE_BUSINESS, CREATE_BUSINESS_ERROR,REQUEST_CREATE_BUSINESS } from './types';
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
// export const createBusinessAction = (business) => {
//   return {
//     type: CREATE_BUSINESS,
//     payload: business
//   }
// };


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
export const transferFund = (transferInfo) => {
  const { userAddress,friendAddress,amount} = transferInfo

  const transfer={
    userAddress,
    friendAddress,
    amount
  }


  return dispatch => {
    // dispatch(createBusinessError(null));
    // dispatch(isRequesting({requesting:true}));
    // dispatch(createBusinessAction({}));
    return axios.post(`${BASE_URL}/crypto/send-fund`,transfer, header())
      .then(response => {
        if (response) {
          const { data: { message } } = response;
        //   dispatch(createBusinessAction(message));
        //   dispatch(isRequesting({requestingCreate:false}));
        //   dispatch(createBusinessError(null));
            alert(message);
          return history.push(window.location.pathname);
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
            alert(message)
            // Materialize.toast({html:message, classes: 'red'});
       }
        else {
              alert(message)
              //   Materialize.toast({html:error, classes:'red'});
        }
      });
  }
}
