export const initialState = {
  dropdownData: [],
  imagesPath: [],
  collectionItem: []
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_COLLECTION_ITEMS": {
      const items = action.dropdownItems
      return {
        ...state,
        dropdownData: items
      }
    }
    case "ADD_COLLECTION_ITEM": {
      const posts = action.posts
      return {
        ...state,
        imagesPath: posts
      }
    }
    case "SET_USER_POST": {
      const collectionItem = action.collectionItem
      return {
        ...state,
        collectionItem: collectionItem
      }
    }
    case "ADD_USER_COLLECTION_ITEM": {
      const newCollection = action.userCollectionItem
      let oldUserCollections = state.dropdownData

      oldUserCollections.pop()
      const newUserCollections = oldUserCollections.concat(newCollection, {
        label: "Add +",
        value: -1
      })

      return {
        ...state,
        dropdownData: newUserCollections
      }
    }

    default: {
      return state
    }
  }
}

export default profileReducer
