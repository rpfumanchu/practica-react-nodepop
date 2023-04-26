import client from "../../api/client";

const adsUrl = "/api/v1/adverts";

export const getAds = () => {
  return client.get(adsUrl);
};

export const getAd = id => {
  const url = `${adsUrl}/${id}`;

  return client.get(url);
};

export const getForm = form => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return client.post(adsUrl, form, config);
};

export const getTags = () => {
  const url = `${adsUrl}/tags`;
  return client.get(url);
};

export const deleteAd = id => {
  const url = `${adsUrl}/${id}`;
  return client.delete(url);
};

// var bodyFormData = new FormData();

// const element = document.getElementById("image");
// const file = element.files[0];

// bodyFormData.append("userName", form.name);
// bodyFormData.append("files[]", file); // files[] ES LO IMPORTANTE, ES LO QUE ESPERA EL FORM DATA

// return client.post("/create/user", bodyFormData, config).then(_ => {
//   console.log("usuario creado");
// });
// };
