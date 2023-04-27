import { useEffect } from "react";
import { useState } from "react";
import { getTags } from "./service";

const DrawTags = () => {
  //const { handleSelect } = props;
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      const tags = await getTags();
      console.log("test", tags);
      setTags(tags);
    }
    fetchTags();
  }, []);

  return (
    <select>
      <option value="">Seleccionar tags...</option>
      {tags.map((tag, index) => (
        <option key={index} value={tag}>
          {tag}
        </option>
      ))}
    </select>
  );
};

export default DrawTags;
