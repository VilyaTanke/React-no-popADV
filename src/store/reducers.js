//  { ESQUEMA DE ESTADO
//      auth: true/false
//      ads: {
//          areLoaded: false,
//          data: []
//          }
//      tags: {
//          areLoaded: false,
//          data: []
//          }
//      ui: {
//            isFetching: true/false,
//            error: error/null,
//            confirm: {params}/null
//            notification: message/null
//          }
//  }

import {
  ADS_LOADED_SUCCES,
  AD_LOADED_SUCCES,
  AUTH_LOGIN_SUCCES,
  AUTH_LOGOUT,
  CREATED_AD_SUCCES,
  DELETED_AD_SUCCES,
  TAGS_LOADED_SUCCES,
  UI_CONFIRM,
  UI_NOTIFICATION,
  UI_NOT_CONFIRM,
  UI_NOT_NOTIFICATION,
  UI_RESET_ERROR,
} from "./types";

const defaultState = {
  auth: false,
  ads: {
    areLoaded: false,
    data: [],
  },
  tags: {
    areLoaded: false,
    data: [],
  },
  ui: {
    isFetching: false,
    error: null,
    confirm: null,
    notification: null,
  },
};

export function auth(state = defaultState.auth, action) {
  if (action.type === AUTH_LOGIN_SUCCES) {
    return true;
  }
  if (action.type === AUTH_LOGOUT) {
    return false;
  }

  return state;
}

export function ads(state = defaultState.ads, action) {
  if (action.type === ADS_LOADED_SUCCES) {
    return { areLoaded: true, data: action.payload };
  }
  if (action.type === AD_LOADED_SUCCES) {
    return { ...state, data: [action.payload] };
  }
  if (action.type === CREATED_AD_SUCCES) {
    return { ...state, data: [action.payload, ...state.data] };
  }
  if (action.type === DELETED_AD_SUCCES) {
    return { ...state, areLoaded: false };
  }

  return state;
}

export function tags(state = defaultState.tags, action) {
  if (action.type === TAGS_LOADED_SUCCES) {
    return { areLoaded: true, data: action.payload };
  }

  return state;
}

export function ui(state = defaultState.ui, action) {
  if (action.error) {
    return {
      ...state,
      error: action.payload,
      isFetching: false,
    };
  }
  if (/_REQUEST$/.test(action.type)) {
    return {
      ...state,
      error: null,
      isFetching: true,
    };
  }
  if (/_SUCCES$/.test(action.type)) {
    return {
      ...state,
      error: null,
      isFetching: false,
    };
  }
  if (action.type === UI_RESET_ERROR) {
    return {
      ...state,
      error: null,
    };
  }
  if (action.type === UI_CONFIRM) {
    return {
      ...state,
      confirm: action.payload,
    };
  }
  if (action.type === UI_NOT_CONFIRM) {
    return {
      ...state,
      confirm: null,
    };
  }
  if (action.type === UI_NOTIFICATION) {
    return {
      ...state,
      notification: action.payload,
    };
  }
  if (action.type === UI_NOT_NOTIFICATION) {
    return {
      ...state,
      notification: null,
    };
  }
  return state;
}
