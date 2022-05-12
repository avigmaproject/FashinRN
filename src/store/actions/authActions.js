export const setToken = token => {
  console.log('tokenAction', token);
  return dispatch => {
    dispatch({type: 'SIGN_IN', token: token});
  };
};

export const signOut = () => {
  return dispatch => {
    dispatch({type: 'SIGN_OUT'});
  };
};
