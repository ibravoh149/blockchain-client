// import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';


const updateUserState = (store) => {
  let token = window.localStorage.getItem('userToken');
  if (token) {
    const { exp } = jwt_decode(token);
     let currentTime = Date.now().valueOf()/1000;
   
      if(currentTime > exp){
        window.localStorage.removeItem('userToken');
        store.dispatch({ type: 'USER_LOGGEDIN', payload: { loggedIn: false } });
        console.log(' session has expired');
      }
      else {
        store.dispatch({ type: 'USER_LOGGEDIN', payload: { loggedIn: true } });
        const user = jwt_decode(token);
        store.dispatch({ type: 'USER_LOGIN', payload: user });
      }
  } else {
    store.dispatch({ type: 'USER_LOGGEDIN', payload: { loggedIn: false } });
  }
}

export default updateUserState;
