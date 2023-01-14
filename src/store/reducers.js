//  { ESQUEMA DE ESTADO
//      auth: true/false
//      ads: []
//      tags: []
//      ui: {
//            isFetching: true/false,  
//            error: error/null
//          }
//  }

import { ADS_LOADED, AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCES, AUTH_LOGOUT, TAGS_LOADED, UI_RESET_ERROR } from "./types";

const defaultState = {
    auth: false,
    ads: [],
    tags: [],
    ui: {
        isFetching: false,
        error: null
    }
};

export function auth(state = defaultState.auth, action) {
    if(action.type === AUTH_LOGIN_SUCCES){
        return true;
    };
    if(action.type === AUTH_LOGOUT){
        return false;
    };
    return state;
};

export function ads(state = defaultState.ads, action) {
    if(action.type === ADS_LOADED){
        return action.payload;
    };

    return state;
};

export function tags(state = defaultState.tags, action) {
    if(action.type === TAGS_LOADED){
        return action.payload;
    };

    return state
};

export function ui(state = defaultState.ui, action) {
    if(action.type === AUTH_LOGIN_REQUEST) {
        return {
            error: null,
            isFetching: true
        };
    };
    if(action.type === AUTH_LOGIN_SUCCES) {
        return {
            error: null,
            isFetching: false
        };
    };
    if(action.type === AUTH_LOGIN_FAILURE) {
        return {
            error: action.payload,
            isFetching: false
        };
    };
    if(action.type === UI_RESET_ERROR) {
        return {
            ...state,
            error: null
        };
    };
    return state
};

// export default function reducer( state = defaultState, action) {
//     return {
//         auth: auth(state.auth, action),
//         ads: ads(state.ads, action)}
// };