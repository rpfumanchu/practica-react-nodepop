import Layout from "../layout/Layout";
import { getAds } from "./service";
import "./AdsPage.css";
import { Link } from "react-router-dom";
import AdDetailPage from "../Ads/AdDetailPage";

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
    <div className="ad-container">
      <ul>
        {ads.map(ad => (
          <li className="ad-list" key={ad.id}>
            <Link to={`/api/v1/adverts/${ad.id}`}>
              Nombre:{ad.name} Estado:{ad.sale === true ? "Venta" : "Compra"}{" "}
              Precio:{ad.price} Tags:{ad.tags}
              {/* <AdDetailPage {...ad} /> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdsPage;
