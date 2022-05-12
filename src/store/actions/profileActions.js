export const setUserCollectionItems = (dropdownItems) => {
  // console.log('tokenAction', token);
  return (dispatch) => {
    dispatch({
      type: "SET_USER_COLLECTION_ITEMS",
      dropdownItems: dropdownItems
    })
  }
}

export const setUserPosts = (posts) => {
  // console.log('tokenAction', token);
  return (dispatch) => {
    dispatch({ type: "SET_USER_POST", posts: posts })
  }
}

export const addUserCollectionItem = (item) => {
  return (dispatch) => {
    dispatch({ type: "ADD_USER_COLLECTION_ITEM", userCollectionItem: item })
  }
}
export const addCollectionItem = (item) => {
  return (dispatch) => {
    dispatch({ type: "ADD_COLLECTION_ITEM", collectionItem: item })
  }
}
