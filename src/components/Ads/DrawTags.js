import { useEffect } from "react";
import { useState } from "react";
import { getTags } from "./service";
import "./DrawTags.css";

const DrawTags = props => {
  const { handleSelectChange } = props;
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      const tags = await getTags();
      console.log("test", tags);
      setTags(tags);
    }
    fetchTags();
  }, []);

  const allTags = Array.from(tags);
  console.log("araysss", allTags);

  return (
    <>
      <div className="filters-tags">
        <select
          id="tags"
          name="tags"
          required
          multiple
          onChange={handleSelectChange}>
          <option value={""}>Seleccionar tags...</option>
          {tags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <small className="small">
        manten pulsado control para seleccionar màs de un Tag
      </small>
    </>
  );
};

export default DrawTags;
