import axios from "axios"
import { API } from "./api.types"

export const register = async (data) => {
  console.log("datatatat", data)
  return axios(API.REGISTRATION_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json"
    },
    data: data
  })
    .then((response) => {
      console.log("responseresponse", response)
      return response.data
    })
    .catch((error) => {
      console.log("errorerror", error)
      throw error
    })
}

export const login = async (data) => {
  return axios(`${API.LOGIN_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json"
    },
    data: data
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export const forgotpassword = async (data) => {
  return axios(`${API.FORGOT_PASSWORD}`, {
    method: "POST",
    data
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export const resetpassword = async (data) => {
  return axios(`${API.RESET_PASSWORD}`, {
    method: "POST",
    data
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export const getUserPost = async (data, access_token) => {
  return axios(`${API.GET_USER_POST}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    },
    data: data
  })
    .then((response) => {
      // console.log(response);
      return response
    })
    .catch((error) => {
      throw error
    })
}

export const getUserCollection = async (data, access_token) => {
  return axios(`${API.GET_USER_COLLECTION}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    },
    data: data
  })
    .then((response) => {
      return response.data[0]
    })
    .catch((error) => {
      throw error
    })
}

export const addUserCollection = async (data, access_token) => {
  return axios(`${API.ADD_USER_COLLECTION}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    },
    data: data
  })
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error
    })
}
export const addprofile = async (data, access_token) => {
  return axios(API.ADD_PROFILE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    },
    data
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export const userprofile = async (data, access_token) => {
  return axios(API.GET_USER_MASTER_DATA, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    },
    data: data
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export const uploadimage = async (data, access_token) => {
  return axios(API.UPLOAD_IMAGE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    },
    data
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export const createUpdateUserPost = async (data, access_token) => {
  return axios(API.CREATE_UPDATE_USER_POST, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    },
    data: data
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export const createUpdateUserFavorite = async (data, access_token) => {
  return axios(API.CREATE_UPDATE_USER_FAVORITE, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    },
    data: data
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}
