import axios from 'axios';
import { GET_ACCESS_TOKEN, GET_ACCESS_TOKEN_ERROR } from './types';
import swal from 'sweetalert';
// import { BASE_URL } from '../helpers/baseurl';
import  header  from "../helpers/getHeader";


 
// export const getAccessTokenAction = (token) => {
//   return {
//     type:GET_ACCESS_TOKEN,
//     payload: token
//   }
// };




// export const accessTokenError = (error) => {
//   return {
//     type: GET_ACCESS_TOKEN_ERROR,
//     payload: error
//   }
// };


export const getAccessToken = () => {
  // console.log('working on action');
  // return axios.post(`https://api.plagscan.com/v3/token`, data, header())
  // .then((response)=>{
  //   console.log(response);
  // })
  // .catch((error)=>{
  // console.log(error)
  // })



  // return dispatch => {
  //   dispatch(accessTokenError(null));
  //   dispatch(getAccessTokenAction({ accessToken: {} }));
  //   return axios.post(`https://api.plagscan.com/v3/token`,
  //       {
  //       client_id,
  //       client_secret
  //   }, header())
  //     .then(response => {
  //       if (response) {
  //           console.log(response);
  //         const { data: { access_token} } = response;
  //       dispatch(getAccessTokenAction({accessToken:access_token }));

  //       }
  //     }).catch(error => {
  //         // console.log(error.response.error);
  //       const { response: { data: {code, message } } } = error;
  //       dispatch(accessTokenError({
  //         error:{
  //             message
  //         }
  //       }));
       
        //  if (status === 401) {
        //   Materialize.toast({html:message, classes: 'red'});
        // }else if(status === 401){
        //   Materialize.toast({html:message, classes: 'red'});
        // }
        // else {
        //   Materialize.toast({html:error, classes:'red'});
        // }
  //     });
  // }
}