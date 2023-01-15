import { areChargedAds, areChargedTags, getAdById } from "./selectors";
import {
  ADS_LOADED_FAILURE,
  ADS_LOADED_REQUEST,
  ADS_LOADED_SUCCES,
  AD_LOADED_FAILURE,
  AD_LOADED_REQUEST,
  AD_LOADED_SUCCES,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCES,
  AUTH_LOGOUT,
  CREATED_AD_FAILURE,
  CREATED_AD_REQUEST,
  CREATED_AD_SUCCES,
  DELETED_AD_FAILURE,
  DELETED_AD_REQUEST,
  DELETED_AD_SUCCES,
  TAGS_LOADED_FAILURE,
  TAGS_LOADED_REQUEST,
  TAGS_LOADED_SUCCES,
  UI_CONFIRM,
  UI_NOTIFICATION,
  UI_NOT_CONFIRM,
  UI_NOT_NOTIFICATION,
  UI_RESET_ERROR,
} from "./types";

export const authLoginSucces = () => ({
  type: AUTH_LOGIN_SUCCES,
});

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginFailure = (error) => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
  error: true,
});

export const authLogin = (credentials) => {
  return async function (dispatch, getState, { api, router }) {
    try {
      dispatch(authLoginRequest());
      const accessToken = await api.auth.login(credentials);

      dispatch(authLoginSucces());
      router.navigate("/");
      return accessToken;
    } catch (err) {
      dispatch(authLoginFailure(err));
      throw err;
    }
  };
};

export const authLogoutSucces = () => ({
  type: AUTH_LOGOUT,
});

export const authLogout = () => {
  return async function (dispatch, getState, { api }) {
    await api.auth.logout();
    dispatch(authLogoutSucces());
  };
};

export const adsLoadedSucces = (ads) => ({
  type: ADS_LOADED_SUCCES,
  payload: ads,
});

export const adsLoadedRequest = () => ({
  type: ADS_LOADED_REQUEST,
});

export const adsLoadedFailure = (error) => ({
  type: ADS_LOADED_FAILURE,
  payload: error,
  error: true,
});

export const adsLoad = () => {
  return async function (dispatch, getState, { api, router }) {
    const chargedAds = areChargedAds(getState());
    if (chargedAds) return;
    try {
      dispatch(adsLoadedRequest());
      const ads = await api.ads.getAds();
      dispatch(adsLoadedSucces(ads));
    } catch (error) {
      dispatch(adsLoadedFailure(error));
      if (error.status === 404) {
        router.navigate("/404");
      }
      throw error;
    }
  };
};

export const adLoadedSucces = (ad) => ({
  type: AD_LOADED_SUCCES,
  payload: ad,
});

export const adLoadedRequest = () => ({
  type: AD_LOADED_REQUEST,
});

export const adLoadedFailure = (error) => ({
  type: AD_LOADED_FAILURE,
  payload: error,
  error: true,
});

export const adLoad = (adId) => {
  return async function (dispatch, getState, { api, router }) {
    const chargedAd = getAdById(adId)(getState());
    if (chargedAd) return;
    try {
      dispatch(adLoadedRequest());
      const ad = await api.ads.getAdId(adId);
      dispatch(adLoadedSucces(ad));
    } catch (error) {
      dispatch(adLoadedFailure(error));
      if (error.status === 404) {
        router.navigate("/404");
      }
    }
  };
};

export const tagsLoadedSucces = (tags) => ({
  type: TAGS_LOADED_SUCCES,
  payload: tags,
});

export const tagsLoadedRequest = () => ({
  type: TAGS_LOADED_REQUEST,
});

export const tagsLoadedFailure = (error) => ({
  type: TAGS_LOADED_FAILURE,
  payload: error,
  error: true,
});

export const tagsLoad = () => {
  return async function (dispatch, getState, { api }) {
    const chargedTags = areChargedTags(getState());
    if (chargedTags) return;
    try {
      dispatch(tagsLoadedRequest());
      const tags = await api.ads.getTags();
      dispatch(tagsLoadedSucces(tags));
    } catch (error) {
      dispatch(tagsLoadedFailure(error));
      throw error;
    }
  };
};

export const uiNotification = (message) => ({
  type: UI_NOTIFICATION,
  payload: message,
});

export const uiNotNotification = () => ({
  type: UI_NOT_NOTIFICATION,
});

export const createAdRequest = () => ({
  type: CREATED_AD_REQUEST,
});

export const createAdSucces = (ad) => ({
  type: CREATED_AD_SUCCES,
  payload: ad,
});

export const createAdFailure = (error) => ({
  type: CREATED_AD_FAILURE,
  payload: error,
  error: true,
});

export const createAd = (formData) => {
  return async function (dispatch, getState, { api, router }) {
    try {
      dispatch(createAdRequest());
      const createNewAd = await api.ads.createAd(formData);
      const newAd = createNewAd.id;
      dispatch(createAdSucces(createNewAd));
      router.navigate(`/ads/${newAd}`);
    } catch (error) {
      dispatch(createAdFailure(error));
      throw error;
    }
  };
};

export const deleteAdRequest = () => ({
  type: DELETED_AD_REQUEST,
});

export const deleteAdSucces = () => ({
  type: DELETED_AD_SUCCES,
});

export const deleteAdFailure = (error) => ({
  type: DELETED_AD_FAILURE,
  payload: error,
  error: true,
});

export const deleteAd = (adId) => {
  return async function (dispatch, getState, { api, router, notifications }) {
    try {
      dispatch(deleteAdRequest());
      await api.ads.deleteAd(adId);
      dispatch(deleteAdSucces());
      dispatch(uiNotification(notifications.messageDeletedAd));
      setTimeout(() => {
        router.navigate("/");
        dispatch(uiNotNotification());
      }, 1000);
    } catch (error) {
      dispatch(deleteAdFailure(error));
      throw error;
    }
  };
};

export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});

export const uiConfirm = (params) => ({
  type: UI_CONFIRM,
  payload: params,
});

export const uiNotConfirm = () => ({
  type: UI_NOT_CONFIRM,
});

export const uiConfirmed = () => {
  return function (dispatch, getState, { api, router, notifications }) {
    const { message, id } = getState().ui.confirm;
    if (message === notifications.messageLogout) {
      dispatch(authLogout());
    }
    if (message === notifications.messageDeleteAd) {
      dispatch(deleteAd(id));
    }
    dispatch(uiNotConfirm());
  };
};
