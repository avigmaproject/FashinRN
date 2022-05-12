export const initialState = {
  isLoading: true,
  isSignout: true,
  userToken: null,
  registerMode: false,
  userid: null,
  binidata: [],
  productdata: null,
  profileimage: '',
};

const reducer = (state = initialState, action) => {
  // console.log("actionaction", action);
  switch (action.type) {
    case 'SIGN_IN': {
      console.log('reduxxxxxxx', {action: action.token});
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    }
    case 'SIGN_OUT': {
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
