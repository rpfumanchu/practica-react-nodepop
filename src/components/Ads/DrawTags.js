import { useEffect } from "react";
import { useState } from "react";
import { getTags } from "./service";

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
      <select
        id="tags"
        name="tags"
        type=""
        required
        multiple
        onChange={handleSelectChange}>
        <option value={"allTags"} defaultChecked>
          Seleccionar tags...
        </option>
        {tags.map((tag, index) => (
          <option key={index} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      <small>manten pulsado control para seleccionar màs de un Tag</small>
    </>
  );
};

export default DrawTags;
