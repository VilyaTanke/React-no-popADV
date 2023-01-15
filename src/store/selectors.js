export const getIsLogged = (state) => state.auth;

export const getListAds = (state) => state.ads.data;

export const areChargedAds = (state) => state.ads.areLoaded;

export const getListTags = (state) => state.tags.data;

export const areChargedTags = (state) => state.tags.areLoaded;

export const getAdById = (adId) => (state) =>
  getListAds(state).find((ad) => ad.id === adId);

export const getUi = (state) => state.ui;

export const getUiError = (state) => state.ui.error;

export const getUiConfirm = (state) => state.ui.confirm;
