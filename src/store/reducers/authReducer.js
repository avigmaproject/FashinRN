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
  switch (action.type) {
    case 'SIGN_IN': {
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    }
  case 'SIGN_IN_NO': {
      return {
        ...state,
        isSignout: false,
        userToken: '',

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
