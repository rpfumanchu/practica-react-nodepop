import client from "../../api/client";

const adsUrl = "/api/v1/adverts";

export const getAds = () => {
  // const url = `${adsUrl}?_expand=user&_embed=likes&_sort=updatedAt&_order=desc`;
  //const url = { adsUrl };
  return client.get(adsUrl);
};

// export const getAd = adsId => {
//   const url = `${adsUrl}/${adsId}`;
//   return client.get(url);
// };

export const getAd = adId => {
  const url = `${adsUrl}/${adId}`;
  return client.get(url);
};
