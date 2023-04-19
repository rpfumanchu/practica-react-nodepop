import client from "../../api/client";

const adsUrl = "/api/v1/adverts";

export const getAds = () => {
  // const url = `${adsUrl}?_expand=user&_embed=likes&_sort=updatedAt&_order=desc`;
  //const url = { adsUrl };
  return client.get(adsUrl);
};
