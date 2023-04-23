import client, {
  setAuthorizationHeader,
  removeAuthorizationHeader,
} from "../../api/client";
import storage from "../../utils/storage";

export const login = credentials => {
  return client.post("/api/auth/login", credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);
    if (credentials.rememberMe) storage.set("auth", accessToken);
  });
};

// export const subirImagen = form => {
//   const config = {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   };

//   var bodyFormData = new FormData();

//   const element = document.getElementById("image");
//   const file = element.files[0];

//   bodyFormData.append("userName", form.name);
//   bodyFormData.append("files[]", file); // files[] ES LO IMPORTANTE, ES LO QUE ESPERA EL FORM DATA

//   return client.post("/create/user", bodyFormData, config).then(_ => {
//     console.log("usuario creado");
//   });
// };

export const logout = async () => {
  removeAuthorizationHeader();
  storage.remove("auth");
  await Promise.resolve();
};
