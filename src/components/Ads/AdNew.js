import Layout from "../layout/Layout";
import "./AdNew.css";
import Button from "../shared/Button";
import { useState } from "react";
import { getForm } from "./service";
import { useNavigate } from "react-router-dom";

const AdNew = ({ ...props }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    sale: Boolean,
    price: 0,
    tags: [],
    photo: [],
  });

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log("text", { formData });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    const adNew = new FormData();

    // adNew.append("name", formData.name);
    // adNew.append("sale", formData.sale);
    // adNew.append("price", formData.price);
    // adNew.append("tags", formData.tags);
    //adNew.append("photo", formData.photo);

    for (let key in formData) {
      adNew.append(key, formData[key]);
    }

    const ad = await getForm(adNew);
    setIsLoading(false);
    navigate(`/api/v1/adverts${ad.id}`);
    console.log(ad);
  };

  return (
    <Layout title="sube un anuncio" {...props}>
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
            value={false}
            onChange={handleChange}
            required
          />
          <label>Comprar</label>
          <input
            className="form-input"
            type="radio"
            name="sale"
            value={true}
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
        <input
          className="form-input"
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          required
          placeholder="Ejm:mobile,motor"
        />

        {/* <label className="form-label">img OPCIONAL:</label> */}
        <input
          className="form-input"
          type="file"
          name="img"
          id="img"
          accept="image/*"
          value={formData.photo}
          onChange={e => setFormData({ ...formData, photo: e.target.files[0] })}
          //onChange={e => setFormData({ photo: e.target.files[0] })}
          placeholder="https://example.com"
          pattern="https://.*"
          size="30"
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
    </Layout>
  );
};

export default AdNew;
