import Layout from "../../layout/Layout";
import "./AdNew.css";
import Button from "../../shared/Button";
import { useEffect, useState } from "react";
import { getForm, getTags } from "../service";
import { useNavigate } from "react-router-dom";
import Spiner from "../../shared/spinner/Spinner";

//import DrawTags from "../DrawTags";

const AdNew = ({ handleSelect, ...props }) => {
  const navigate = useNavigate();
  //const [isLoading, setIsLoading] = useState(true);
  const [isCreateAd, setIsCreateAd] = useState(false);
  const [tags, setTags] = useState([]);
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
    // const options = event.target.options;
    // const selectedTags = [];

    // for (let i = 0; i < options.length; i++) {
    //   if (options[i].selected) {
    //     selectedTags.push(options[i].value);
    //   }
    // }

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
    console.log(ad);
  };

  useEffect(() => {
    async function fetchTags() {
      const tags = await getTags();
      console.log("test", tags);
      setTags(tags);
    }
    fetchTags();
  }, []);

  return (
    <Layout title="sube un anuncio" {...props}>
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
          {/* <input
            className="form-input"
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            required
            placeholder="Ejm:mobile,motor"
          /> */}

          {/* <DrawTags onChange={handleSelectChange} {...props} /> */}

          <select
            id="tags"
            name="tags"
            type="text"
            required
            multiple
            pattern="manten control para mas de un Tag"
            onChange={handleSelectChange}>
            <option value="">Seleccionar tags...</option>
            {tags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <small>manten pulsado control para seleccionar màs de un Tag</small>

          {/* <select
            id="tags"
            name="tags"
            type="text"
            required
            multiple
            onChange={handleSelectChange}>
            <option value="">Seleccionar tags...</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="mobile">Mobile</option>
            <option value="motor">Motor</option>
            <option value="work">Work</option>
          </select> */}

          {/* <label className="form-label">img OPCIONAL:</label> */}
          <input
            className="form-input"
            type="file"
            name="img"
            id="img"
            accept="image/*"
            //value={photo.photo}
            //onChange={e => setFormData({ ...formData, photo: e.target.files[0] })}
            onChange={handleChangeInputFlile}
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
      )}
    </Layout>
  );
};

export default AdNew;
