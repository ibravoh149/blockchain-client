const header = () => ({
  headers: {
    'x-access-token': window.localStorage.userToken,
    Authorization: window.localStorage.userToken
  }
});

export default header;
