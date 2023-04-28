import Layout from "../../layout/Layout";
import "./AdNew.css";
import Button from "../../shared/Button";
import { useState } from "react";
import { getForm } from "../service";
import { useNavigate } from "react-router-dom";
import Spiner from "../../shared/spinner/Spinner";
import DrawTags from "../DrawTags";

const AdNew = () => {
  const navigate = useNavigate();
  //const [isLoading, setIsLoading] = useState(true);
  const [isCreateAd, setIsCreateAd] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    sale: true,
    price: "",
  });

  const handleSelectChange = event => {
    const selectedTags = Array.from(
      event.target.selectedOptions,
      option => option.value,
    );

    setFormData({ ...formData, tags: selectedTags });
  };

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log("text", { formData });
  };
  const handleChangeInputFlile = e => {
    setPhoto({ ...photo, photo: e.target.files[0] });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    //setIsLoading(false);
    setIsCreateAd(true);
    const adNew = new FormData();
    if (photo === null) {
      adNew.append("name", formData.name);
      adNew.append("sale", formData.sale);
      adNew.append("price", formData.price);
      adNew.append("tags", formData.tags);
    } else {
      adNew.append("name", formData.name);
      adNew.append("sale", formData.sale);
      adNew.append("price", formData.price);
      adNew.append("tags", formData.tags);
      adNew.append("photo", photo.photo);
    }

    // adNew.append("name", formData.name);
    // adNew.append("sale", formData.sale);
    // adNew.append("price", formData.price);
    // adNew.append("tags", formData.tags);
    // adNew.append("photo", photo.photo);

    // for (let key in formData) {
    //   adNew.append(key, formData[key]);
    // }

    const ad = await getForm(adNew);
    // setIsLoading(true);
    setIsCreateAd(false);
    navigate(`/api/v1/adverts/${ad.id}`);
  };

  return (
    <Layout title="sube un anuncio">
      {isCreateAd ? (
        <Spiner message="creando..." />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="container-form"
          encType="multipart/form-data">
          {/* <label className="form-label">Articulo</label> */}
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Nombre del artículo"
          />

          <div className="form-label">
            <label>Vender</label>
            <input
              className="form-input"
              type="radio"
              name="sale"
              value={true}
              onChange={handleChange}
              required
            />
            <label>Comprar</label>
            <input
              className="form-input"
              type="radio"
              name="sale"
              value={false}
              onChange={handleChange}
              required
            />
          </div>

          {/* <label className="form-label">Precio</label> */}
          <input
            className="form-input"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          {/* <label className="form-label">Tag</label> */}

          <DrawTags handleSelectChange={handleSelectChange} />

          {/* <label className="form-label">img OPCIONAL:</label> */}
          <input
            className="form-input"
            type="file"
            name="img"
            id="img"
            accept="image/*"
            onChange={handleChangeInputFlile}
          />

          <Button
            type="submit"
            variant="primary"
            width="button-form"
            // disabled={buttonDisabled}>
          >
            Crear
          </Button>
        </form>
      )}
    </Layout>
  );
};

export default AdNew;
