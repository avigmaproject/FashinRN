export const setToken = token => {
  return dispatch => {
    dispatch({type: 'SIGN_IN', token: token});
  };
};

export const signOut = () => {
  return dispatch => {
    dispatch({type: 'SIGN_OUT'});
  };
};
export const signIN = () => {
  return dispatch => {
    dispatch({type: 'SIGN_IN_NO'});
  };
};