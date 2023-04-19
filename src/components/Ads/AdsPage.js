import Layout from "../layout/Layout";
import { getAds } from "./service";
import "./AdsPage.css";

const { useState, useEffect } = require("react");

const AdsPage = ({ ...rest }) => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const ads = await getAds();
      setAds(ads);
      console.log(ads);
    }
    fetchData();
  }, []);

  return (
    <Layout title="Ultimos Anuncios" {...rest}>
      <div className="ad-container">
        <ul>
          {ads.map(ad => (
            <li className="ad-list" key={ad.id}>
              Nombre:{ad.name} Estado:{ad.sale === true ? "Venta" : "Compra"}{" "}
              Precio:{ad.price} Tags:{ad.tags}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default AdsPage;
