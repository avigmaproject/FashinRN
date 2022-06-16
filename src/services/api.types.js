// export const BASE_URL = "http://apifashion.ikaart.org/"
export const BASE_URL = "https://api.fashin.us/"

export const API = {
  REGISTRATION_API: "https://api.fashin.us//token",
  // REGISTRATION_API: 'http://apifashion.ikaart.org/token',
  RESET_PASSWORD: BASE_URL + "/api/Fashion/ChangePasswordByEmail",
  FORGOT_PASSWORD: BASE_URL + "/api/Fashion/ForGotPassword",
  LOGIN_API: BASE_URL + "/token",
  GET_USER_POST: BASE_URL + "api/Fashion/GetUserPost",
  GET_USER_COLLECTION: BASE_URL + "/api/Fashion/GetUserCollection",
  ADD_USER_COLLECTION: BASE_URL + "api/Fashion/CreateUpdateUserCollection",
  UPLOAD_IMAGE: BASE_URL + "/api/Fashion/UploadImages",
  ADD_PROFILE: BASE_URL + "/api/Fashion/AddUserMasterData",
  GET_USER_MASTER_DATA: BASE_URL + "/api/Fashion/GetUserMasterData",
  CREATE_UPDATE_USER_POST: BASE_URL + "/api/Fashion/CreateUpdateUserPost",
  CREATE_UPDATE_USER_FAVORITE:
    BASE_URL + "/api/Fashion/CreateUpdateUserFavorite",
  GET_USER_FAVORITE: BASE_URL + "/api/Fashion/GetUserFavorite"
}
