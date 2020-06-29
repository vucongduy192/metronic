import $ from "jquery";
import ApiService from "@/common/api.service";

export const FETCH_USER_LIST = "fetchUserList";
export const SET_USER_LIST = "setUserList";
export const CREATE_USER = "createUser";
export const UPDATE_USER = "updateUser";
export const DELETE_USER = "deleteUser";

// response: {message: '', error: []}
export const SET_ERROR = "setError";
export const PURGE_ERROR = "purgeError";

export default {
  state: {
    listUsers: [],
    totalUsers: 0,
    totalPages: 0,
    errors: {
      message: null,
      email: [],
      name: [],
    },
  },
  getters: {
    listUsers(state) {
      return state.listUsers;
    },
    totalUsers(state) {
      return state.totalUsers;
    },
    totalPages(state) {
      return state.totalPages;
    },
    userErrors(state) {
      return state.errors;
    },
  },
  actions: {
    [FETCH_USER_LIST](context, params) {
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.get(`users?${$.param(params)}`)
          .then(({ data }) => {
            context.commit(SET_USER_LIST, data);
            resolve(data);
          })
          .catch(({ response }) => {
            reject(response);
          });
      });
    },
    [UPDATE_USER](context, { id, params }) {
      return new Promise((resolve, reject) => {
        console.log(id);
        ApiService.setHeader();
        ApiService.put(`users/${id}`, params)
          .then(({ data }) => {
            resolve(data);
          })
          .catch(({ response }) => {
            context.commit(SET_ERROR, response.data);
            reject(response);
          });
      });
    },
    [CREATE_USER](context, { params }) {
      return new Promise((resolve) => {
        ApiService.setHeader();
        ApiService.post("users", params)
          .then(({ data }) => {
            resolve(data);
          })
          .catch(({ response }) => {
            context.commit(SET_ERROR, response.data);
          });
      });
    },
    [DELETE_USER](context, { id }) {
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.delete(`users/${id}`)
          .then(({ data }) => {
            resolve(data);
          })
          .catch(({ response }) => {
            reject(response);
          });
      });
    },
    [PURGE_ERROR](context) {
      context.commit(PURGE_ERROR);
    },
  },
  mutations: {
    [SET_USER_LIST](state, data) {
      state.listUsers = data.data;
      state.totalUsers = data.meta.total;
      state.totalPages = data.meta.last_page;
    },
    [SET_ERROR](state, data) {
      Object.assign(state.errors, data.errors);
      state.errors.message = data.message;
    },
    [PURGE_ERROR](state) {
      state.errors = {
        message: "",
        email: [],
        name: [],
      };
    },
  },
};
