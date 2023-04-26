import React, { useState } from "react";
function AdForm() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    tags: [],
    photo: null,
    sale: false,
  });

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("tags", JSON.stringify(formData.tags));
    data.append("photo", formData.photo);
    data.append("sale", formData.sale);
    // Aquí puedes enviar data a tu backend
  };

  const handleChange = event => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    const name = event.target.name;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>
      <label>
        Tags:
        <select
          multiple
          name="tags"
          value={formData.tags}
          onChange={handleChange}>
          <option value="tag1">Tag 1</option>
          <option value="tag2">Tag 2</option>
          <option value="tag3">Tag 3</option>
        </select>
      </label>
      <label>
        Photo:
        <input
          type="file"
          name="photo"
          onChange={event =>
            setFormData(prevFormData => ({
              ...prevFormData,
              photo: event.target.files[0],
            }))
          }
        />
      </label>
      <div>
        <label>Sale:</label>
        <label>
          <input
            type="radio"
            name="sale"
            value="true"
            checked={formData.sale === true}
            onChange={handleChange}
          />
          True
        </label>
        <label>
          <input
            type="radio"
            name="sale"
            value="false"
            checked={formData.sale === false}
            onChange={handleChange}
          />
          False
        </label>
      </div>
      <button type="submit">Create Ad</button>
    </form>
  );
}
